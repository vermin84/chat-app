import { useEffect, useState } from "react";

import { api } from "../services/api";
import type { Chat, Message } from "../types";

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  // загрузка чатов при монтировании
  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    try {
      const data = await api.getChats();
      setChats(data);
      if (!activeId && data.length) setActiveId(data[0]._id);
    } catch {
      console.warn("Fallback: using demo chats");
      setChats([
        { _id: "1", firstName: "Anna", lastName: "Ivanova" },
        { _id: "2", firstName: "John", lastName: "Doe" },
      ]);
    }
  }

  async function loadMessages(chatId: string) {
  try {
    const msgs = await api.getMessages(chatId);
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), ...msgs]
    }));
  } catch {
    setMessages(prev => ({ ...prev, [chatId]: prev[chatId] || [] }));
  }
}

  async function createChat(first: string, last: string) {
    const created = await api.createChat(first, last);
    setChats(prev => [created, ...prev]);
    setActiveId(created._id);
  }

  async function updateChat(id: string, first: string, last: string) {
    const updated = await api.updateChat(id, first, last);
    setChats(prev => prev.map(c => c._id === id ? updated : c));
  }

  async function deleteChat(id: string) {
    await api.deleteChat(id);
    setChats(prev => prev.filter(c => c._id !== id));
    if (activeId === id) setActiveId(null);
  }

 async function sendMessage(chatId: string, text: string) {
  const newMsg: Message = { text, author: "me", createdAt: new Date().toISOString() };
  setMessages(prev => ({
    ...prev,
    [chatId]: [...(prev[chatId] || []), newMsg]
  }));

  
  try {
    await api.postMessage(chatId, text);
  } catch {
    console.warn("Failed to send to server, fallback to local");
  }

  
  setTimeout(async () => {
    const res = await fetch("https://api.quotable.io/random");
    const q = await res.json();
    const bot: Message = { text: q.content, author: "bot", createdAt: new Date().toISOString() };
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), bot]
    }));
  }, 3000);
}

  return {
    chats,
    messages,
    activeId,
    setActiveId,
    loadMessages,
    createChat,
    updateChat,
    deleteChat,
    sendMessage,
  };
}
