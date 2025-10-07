import type { Request, Response } from "express";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";

// Получить все чаты
export async function getChats(req: Request, res: Response) {
  const chats = await Chat.find();
  res.json(chats);
}

// Создать чат
export async function createChat(req: Request, res: Response) {
  const { firstName, lastName } = req.body;
  const chat = await Chat.create({ firstName, lastName });
  res.status(201).json(chat);
}

// Обновить чат
export async function updateChat(req: Request, res: Response) {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const chat = await Chat.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  res.json(chat);
}

// Удалить чат
export async function deleteChat(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await Message.deleteMany({ chat: id }); // удаляем все сообщения чата
    await Chat.findByIdAndDelete(id);

    res.json({ message: "Chat deleted successfully" }); // <-- важно вернуть JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении чата" });
  }
}
