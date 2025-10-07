import { Router } from "express";
import { getChats, createChat, updateChat, deleteChat } from "../controllers/chatController.js";

const router = Router();

router.get("/", getChats);
router.post("/", createChat);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

export default router;
