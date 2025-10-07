import { Router } from "express";
import { getMessages, postMessage, botReply } from "../controllers/messageController.js";

const router = Router();

// Путь: /api/chats/:id/messages
router.get("/:id/messages", getMessages);
router.post("/:id/messages", postMessage);

// Путь: /api/chats/:id/bot-reply
router.get("/:id/bot-reply", botReply);

export default router;
