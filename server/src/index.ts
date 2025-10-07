import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chats.js";
import messageRoutes from "./routes/messages.js";
import { connectDB } from "./db/connect.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Адрес вашего фронта (Vite)
  credentials: true, // если нужны куки
}));
//app.use(cors());
app.use(express.json());

// Роуты
app.use("/api/chats", chatRoutes);
app.use("/api/chats", messageRoutes); // сообщения находятся внутри чата

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
