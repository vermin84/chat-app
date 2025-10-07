import { useEffect, useState, type ReactNode } from "react";
import { ChatContext } from "./ChatContext";
import { api } from "../services/api";
import type { Chat, Message } from "../types";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

type Props = { children: ReactNode };

export default function ChatContextProvider({ children }: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const { toast, showToast } = useToast(3000);

  // Последние ID сообщений бота по чатам
  const [lastBotIds, setLastBotIds] = useState<Record<string, string>>({});

  // --- Загрузка чатов при монтировании ---
  useEffect(() => {
    async function loadChats() {
      try {
        const data = await api.getChats();
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    }
    loadChats();
  }, []);

  // --- Загрузка сообщений активного чата ---
  useEffect(() => {
    if (!activeId) return;
    async function loadMessages(chatId: string) {
      try {
        const msgs = await api.getMessages(chatId);
        setMessages(prev => ({ ...prev, [chatId]: msgs }));
      } catch (err) {
        console.error("Failed to load messages:", err);
        setMessages(prev => ({ ...prev, [chatId]: [] }));
      }
    }
    if (!messages[activeId]) loadMessages(activeId);
  }, [activeId, messages]);

  // --- Polling сообщений всех чатов каждые 2 секунды ---
  useEffect(() => {
    if (chats.length === 0) return;

    const interval = setInterval(async () => {
      for (const chat of chats) {
        try {
          const msgs = await api.getMessages(chat._id);
          setMessages(prev => {
            const prevMsgs = prev[chat._id] || [];
            const newMsgs = msgs.filter(m => !prevMsgs.some(pm => pm._id === m._id));

            if (newMsgs.length === 0) return prev;

            // Тосты для новых сообщений бота
            newMsgs.forEach(m => {
              if (m.author === "bot") {
                const lastId = lastBotIds[chat._id];
                if (m._id !== lastId) {
                  const active = chat._id === activeId;
                  showToast(
                    active
                      ? `🤖 Бот ответил: ${m.text}`
                      : `🤖 Новое сообщение в чате ${chat.firstName} ${chat.lastName}`
                  );
                  // Обновляем последний ID бота
                  setLastBotIds(prevIds => ({ ...prevIds, [chat._id]: m._id! }));
                }
              }
            });

            return { ...prev, [chat._id]: [...prevMsgs, ...newMsgs] };
          });
        } catch (err) {
          console.error("Polling messages error:", err);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [chats, activeId, lastBotIds, showToast]);

  // --- Работа с чатами ---
  async function createChat(first: string, last: string) {
    if (!first || !last) return;
    try {
      const created = await api.createChat(first, last);
      setChats(prev => [created, ...prev]);
      setActiveId(created._id);
      setShowNew(false);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  }

  async function updateChat(id: string, first: string, last: string) {
    try {
      const updated = await api.updateChat(id, first, last);
      setChats(prev => prev.map(c => (c._id === id ? updated : c)));
    } catch (err) {
      console.error("Failed to update chat:", err);
    }
  }

  async function deleteChat(id: string) {
    try {
      if (activeId === id) setActiveId(null);
      await api.deleteChat(id);
      setChats(prev => prev.filter(c => c._id !== id));
      setMessages(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setLastBotIds(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  }

  // --- Отправка сообщения ---
  async function sendMessage(chatId: string, text: string) {
    if (!chatId || !text.trim()) return;

    if (!messages[chatId]) setMessages(prev => ({ ...prev, [chatId]: [] }));

    try {
      // 1. Сообщение пользователя
      const message = await api.postMessage(chatId, text);
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), message],
      }));

      // 2. Ответ бота
      const bot = await api.getBotReply(chatId);
      if (!bot?.text) return;

      const botMessage: Message = {
        text: bot.text,
        author: "bot",
        createdAt: new Date().toISOString(),
        _id: bot._id ?? new Date().toISOString(),
      };

      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), botMessage],
      }));

      // Тост сразу при ответе бота, если активен чат
      if (chatId === activeId) showToast(`🤖 Бот ответил: ${botMessage.text}`);
      else setLastBotIds(prev => ({ ...prev, [chatId]: botMessage._id! }));
    } catch (err) {
      console.error("sendMessage error:", err);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        activeId,
        setActiveId,
        loadMessages: async (chatId: string) => {
          const msgs = await api.getMessages(chatId);
          setMessages(prev => ({ ...prev, [chatId]: msgs }));
        },
        createChat,
        updateChat,
        deleteChat,
        sendMessage,
        showNew,
        onShowNew: () => setShowNew(true),
        unShowNew: () => setShowNew(false),
      }}
    >
      {children}
      <Toast message={toast} />
    </ChatContext.Provider>
  );
}
