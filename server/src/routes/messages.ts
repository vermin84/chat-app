import { Router } from "express";
import { getMessages, postMessage, botReply } from "../controllers/messageController.js";

const router = Router();

router.get("/:id/messages", getMessages);
router.post("/:id/messages", postMessage);
router.get("/:id/bot-reply", botReply);

export default router;
