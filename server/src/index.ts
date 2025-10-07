import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chats.js";
import messageRoutes from "./routes/messages.js";
import { connectDB } from "./db/connect.js";

dotenv.config();
const app = express();

// --- CORS ---
app.use(cors({
  origin: [
    "https://chat-app-front-3aqq.onrender.com", // фронт на Render
    "http://localhost:5173"                     // локальный фронт
  ],
  credentials: true
}));

app.use(express.json());

// --- Роуты ---
app.use("/api/chats", chatRoutes);        // чат
app.use("/api/chats", messageRoutes);     // сообщения внутри чата

// --- Порт ---
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
