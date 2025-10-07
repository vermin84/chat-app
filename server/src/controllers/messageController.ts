import type { Request, Response } from "express";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import fetch from "node-fetch";

// --- Получить сообщения чата ---
export async function getMessages(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await Message.find({ chat: id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Ошибка при получении сообщений:", err);
    res.status(500).json({ message: "Ошибка сервера при получении сообщений" });
  }
}

// --- Получить ответ бота ---
export async function botReply(): Promise<string> {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json() as any;

    // Берем цитату, если есть, иначе дефолт
    return data[0]?.q || "Привет! Это автоответ бота.";
  } catch (err) {
    console.error("Ошибка получения цитаты бота:", err);
    return "Привет! Это автоответ бота.";
  }
}

// --- Добавить сообщение ---
export async function postMessage(req: Request, res: Response) {
  const { id } = req.params;
  const { text, author } = req.body;

  try {
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Создаем сообщение пользователя
    const userMessage = await Message.create({
      chat: id,
      text,
      author: author || "me",
    });

    res.status(201).json(userMessage);

    // Если сообщение от пользователя (без author), добавляем автоответ бота через 3 секунды
    if (!author) {
      setTimeout(async () => {
        try {
          const botText = await botReply();

          await Message.create({
            chat: id,
            text: botText,
            author: "bot",
          });
        } catch (err) {
          console.error("Ошибка создания сообщения бота:", err);
        }
      }, 3000);
    }
  } catch (err) {
    console.error("Ошибка при добавлении сообщения:", err);
    res.status(500).json({ message: "Ошибка сервера при добавлении сообщения" });
  }
}
