/* components/chat/ChatWindow.tsx */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getPusher } from "@/lib/pusherClient";
import { chatIdFor } from "@/lib/chatIds";
import ChatSidebar from "./ChatSidebar";
import ChatInput from "./ChatInput";
import ChatMessage, { ChatMsg } from "./ChatMessage";

export default function ChatWindow() {
  const { isLoaded, userId } = useAuth();
  const [peer, setPeer] = useState<{ id: string; firstName: string; lastName: string; avatar?: string }>();
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatId = useMemo(() => (peer && userId) ? chatIdFor(userId, peer.id) : null, [peer, userId]);

  // Load history on chat change
  useEffect(() => {
    if (!chatId) return;
    (async () => {
      const res = await fetch(`/api/chat/history?chatId=${chatId}`);
      setMsgs(await res.json());
    })();
  }, [chatId]);

  // Subscribe Pusher channels
  useEffect(() => {
    if (!chatId || !userId) return;
    const p = getPusher();

    const roomCh   = p.subscribe(`chat-${chatId}`);
    const inboxCh  = p.subscribe(`user-${userId}`);   // 🆕 personal channel

    const handler  = (m: ChatMsg) => setMsgs((arr) => [...arr, m]);

    roomCh.bind("new", handler);
    inboxCh.bind("inbox", (m: ChatMsg) => {
      // Only push if we're already in that room
      if (m.chatId === chatId) handler(m);
    });

    return () => {
      roomCh.unbind("new", handler);
      inboxCh.unbind("inbox", handler);
      p.unsubscribe(`chat-${chatId}`);
      p.unsubscribe(`user-${userId}`);
    };
  }, [chatId, userId]);

  // Scroll down on new message
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [msgs]);

  const send = async ({ text, file }: { text?: string; file?: File }) => {
    if (!peer || !userId) return;
    const file64 = file ? await new Promise<string>((ok) => {
      const r = new FileReader(); r.onload = () => ok(r.result as string); r.readAsDataURL(file);
    }) : undefined;

    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peerId: peer.id, text, file: file64 }),
    });
  };

  if (!isLoaded) return <div className="p-4">Loading…</div>;

  return (
    <div className="flex h-full">
      <ChatSidebar meId={userId!} onSelect={setPeer} />

      <div className="flex-1 flex flex-col">
        {/* Header with peer */}
        <div className="border-b px-4 py-2 font-semibold bg-white">
          {peer ? `${peer.firstName} ${peer.lastName}` : "Select a user"}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-auto p-4 bg-gray-50">
          {msgs.map((m) => (
            <ChatMessage key={m.id} msg={m} meId={userId!} />
          ))}
        </div>

        {/* Input */}
        <ChatInput disabled={!peer} onSend={send} />
      </div>
    </div>
  );
}
