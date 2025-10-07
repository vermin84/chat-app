import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const Chat = mongoose.model("Chat", chatSchema);
