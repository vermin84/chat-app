import {  useState } from "react";
import ChatList from "./components/ChatList";
import NewChatModal from "./components/NewChatModal";
import EditChatModal from "./components/EditChatModal";
import ChatBox from "./components/ChatBox";
import styles from "./App.module.css";
import type { Chat } from "./types";
import { useChatContext } from "./store/useChatContext";

export default function App() {
  const {
    chats,
    messages,
    activeId,
    setActiveId,
    sendMessage,
    createChat,
    updateChat,
    showNew,
    unShowNew,
  } = useChatContext();

  const [editChat, setEditChat] = useState<Chat | null>(null);
  const [query, setQuery]= useState<string>('')
  

  const activeChat = chats.find((c) => c._id === activeId);
  const msgs = activeId ? messages[activeId] || [] : [];
  const filteredChats = chats.filter(
  (c) =>
    `${c.firstName} ${c.lastName}`
      .toLowerCase()
      .includes(query.toLowerCase())
);

  return (
    <div className={styles.chatWrapper}>
      {/* === Список чатов === */}
      <ChatList
        chats={filteredChats}
        activeId={activeId}
        onSelect={setActiveId}
        onEdit={setEditChat}
        query={query}
        setQuery = {setQuery}
      />

      {/* === Чат === */}
      <div className={styles.chatView}>
        {activeChat ? (
          <ChatBox
            activeChat={activeChat}
            msgs={msgs}
            sendMessage={sendMessage}
          />
        ) : (
          <div className={styles.emptyList}>No chat selected</div>
        )}
      </div>

      {/* === Модалки === */}
      {showNew && (
        <NewChatModal onClose={unShowNew} onCreate={createChat} />
      )}
      {editChat && (
        <EditChatModal
          chat={editChat}
          onClose={() => setEditChat(null)}
          onSave={updateChat}
        />
      )}
    </div>
  );
}
