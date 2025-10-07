import { createContext } from "react";
import type { Chat, Message } from "../types";

export type ChatContextType = {
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  loadMessages: (chatId: string) => Promise<void>;
  createChat: (first: string, last: string) => Promise<void>;
  updateChat: (id: string, first: string, last: string) => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  showNew: boolean;
  onShowNew: () => void;
  unShowNew: () => void;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
