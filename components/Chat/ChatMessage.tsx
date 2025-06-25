'use client';
import Image from 'next/image';

export interface ChatMsg {
  chatId: string;
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text?: string;
  file?: string;
  createdAt: string;
}

interface ChatMessageProps {
  msg: ChatMsg;
  meId: string;
}

export default function ChatMessage({ msg, meId }: ChatMessageProps) {
  const isMe = msg.senderId === meId;
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isMe && msg.senderAvatar && (
        <Image
          src={msg.senderAvatar}
          alt={msg.senderName}
          width={36}
          height={36}
          className="rounded-full mr-2"
        />
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded ${
          isMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {msg.text && <p>{msg.text}</p>}
        {msg.file && (
          <img src={msg.file} alt="attachment" className="mt-2 max-w-full rounded" />
        )}
      </div>
    </div>
  );
}
