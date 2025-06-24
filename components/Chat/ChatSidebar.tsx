// components/chat/ChatSidebar.tsx
"use client";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Input } from "@/components/ui/input";

export interface Participant {
  senderId: string;
  senderName: string;
  senderAvatar?: string;
}

export default function ChatSidebar({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [list, setList] = useState<Participant[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    fetch("/api/chat/users")
      .then((r) => r.json())
      .then(setList);
  }, []);
  const filtered = list.filter((u) =>
    u.senderName.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="h-full w-64 bg-white border-r p-4 flex flex-col">
      <Input
        placeholder="Search…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="mt-4 flex-1 overflow-auto">
        {filtered.map((u) => (
          <div
            key={u.senderId}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(u.senderId)}
          >
            <Avatar src={u.senderAvatar} size={32} />
            <div>{u.senderName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
