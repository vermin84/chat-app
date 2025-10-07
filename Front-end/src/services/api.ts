import type { Chat, Message } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : "https://chat-app-front-3aqq.onrender.com";

async function safeJson(res: Response) {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  getChats: async (): Promise<Chat[]> => safeJson(await fetch(`${API_BASE}/chats`)),
  createChat: async (firstName: string, lastName: string) =>
    safeJson(await fetch(`${API_BASE}/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    })),
  updateChat: async (id: string, firstName: string, lastName: string) =>
    safeJson(await fetch(`${API_BASE}/chats/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    })),
  deleteChat: async (id: string) =>
    safeJson(await fetch(`${API_BASE}/chats/${id}`, { method: "DELETE" })),
  getMessages: async (chatId: string): Promise<Message[]> =>
    safeJson(await fetch(`${API_BASE}/chats/${chatId}/messages`)),
  postMessage: async (chatId: string, text: string) =>
    safeJson(await fetch(`${API_BASE}/chats/${chatId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })),
  getBotReply: async (chatId: string) =>
    safeJson(await fetch(`${API_BASE}/chats/${chatId}/bot-reply`)),
};
