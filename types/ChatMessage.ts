export interface ChatMessage {
  id: string;
  text?: string;
  image?: string; // URL or base64
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatMessageDto {
  text?: string;
  image?: File | Blob;
}
