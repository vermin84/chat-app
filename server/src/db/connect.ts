import mongoose from "mongoose";

export async function connectDB() {
  const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chat-app";
  await mongoose.connect(url);
  console.log("MongoDB connected");
}
