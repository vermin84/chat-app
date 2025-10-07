export type Chat = {
  _id: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  lastMessage?: string;
};

export type Message = {
  _id?: string;
  text: string;
  author: "me" | "bot" | "other";
  createdAt?: string;
};


