
import { useContext } from "react";
import { ChatContext } from "./ChatContext";

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatContextProvider");
  return ctx;
}
