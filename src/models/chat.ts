export type ChatRoles = "system" | "user" | "assistant" | "tool";

export interface BaseMessage {
  content: string;
}

export interface SystemMessage extends BaseMessage {
  role: "system";
  id?: string;
}

export interface ChatMessage extends BaseMessage {
  id: string;
  timestamp: string;
  role: "user" | "assistant" | "tool";
}

export type Message = ChatMessage | SystemMessage;

export interface Chat {
  messages: Message[];
  name: string;
}
