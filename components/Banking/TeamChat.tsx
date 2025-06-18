"use client";
import { Card } from "@/components/ui/card";
import { Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const messages = [
  { name: "Devon Lane", avatar: "https://randomuser.me/api/portraits/men/32.jpg", msg: "Hi. What can I help you with?", time: "10:00 PM", type: "text" },
  { name: "Devon Lane", avatar: "https://randomuser.me/api/portraits/men/32.jpg", msg: "Hi. What can I help you with?", time: "10:01 PM", type: "text" },
  { name: "Devon Lane", avatar: "https://randomuser.me/api/portraits/men/32.jpg", msg: "1:29", time: "10:01 PM", type: "audio" },
];

export default function TeamChat() {
  const [text, setText] = useState("");

  return (
    <Card className="bg-white border border-[#e6effa] p-5 rounded-2xl shadow-sm flex flex-col h-[340px]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg text-[#02152b]">Team Chat</span>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="w-5 h-5 text-[#0056B6]" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm text-[#02152b]">{m.msg}</div>
              <div className="text-[10px] text-[#7896ad]">{m.time}</div>
            </div>
            {m.type === "audio" && (
              <span className="text-[#4bc18c] text-xs font-mono">🎵 {m.msg}</span>
            )}
          </div>
        ))}
      </div>
      <form
        className="flex items-center gap-2 mt-2"
        onSubmit={e => {
          e.preventDefault();
          // Handle send
          setText("");
        }}
      >
        <Input
          className="flex-1 rounded-xl border-[#e6effa] bg-[#f2f8fd] text-sm"
          placeholder="Type your message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button size="icon" className="rounded-full bg-[#0056B6] hover:bg-[#00449e] text-white">
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </Card>
  );
}
