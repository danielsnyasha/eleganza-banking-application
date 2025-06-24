// components/chat/ChatMessage.tsx
"use client";
import Avatar from "./Avatar";

export interface ChatMsg {
  userId: any;
  name: string;
  avatar: string;
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text?: string;
  file?: string;
  createdAt: string;
}

export default function ChatMessage({
  msg,
  me,
}: {
  msg: ChatMsg;
  me: { userId: string };
}) {
  const isMe = msg.senderId === me.userId;
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      {!isMe && <Avatar src={msg.senderAvatar} size={32} />}
      <div className="mx-2 max-w-xs">
        <div className={`p-2 rounded ${isMe ? "bg-green-200" : "bg-gray-200"}`}>
          {msg.text}
          {msg.file && <img src={msg.file} className="mt-2 max-w-full" />}
        </div>
        <div className="text-xs text-gray-500 text-right">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </div>
      </div>
      {isMe && <Avatar src={msg.senderAvatar} size={32} />}
    </div>
  );
}
