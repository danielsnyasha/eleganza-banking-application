// components/chat/ChatInput.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput({
  onSend,
}: {
  onSend: (payload: { text?: string; file?: File }) => void;
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex items-center gap-2 p-2 border-t">
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <Input
        className="flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
      />
      <Button
        onClick={() => {
          onSend({ text: text || undefined, file: file || undefined });
          setText("");
          setFile(null);
        }}
      >
        Send
      </Button>
    </div>
  );
}
