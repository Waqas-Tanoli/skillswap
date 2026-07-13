export interface ChatUser {
  _id: string;
  username: string;
  avatar?: string;
}

export interface ChatMessage {
  _id: string;

  swap: string;

  sender: ChatUser;

  receiver: ChatUser;

  message: string;

  createdAt: string;
}