'use client';
import { useState } from 'react';

interface ChatInputProps {
  disabled: boolean;
  onSend: (payload: { text?: string; file?: File }) => void;
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    if (text.trim() || file) {
      onSend({ text: text.trim() || undefined, file: file || undefined });
      setText('');
      setFile(null);
    }
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        📎
      </label>
      <input
        type="text"
        className="flex-1 border rounded px-2 py-1"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Send
      </button>
    </div>
  );
}
