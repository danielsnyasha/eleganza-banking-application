// components/chat/ChatWindow.tsx
"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import ChatSidebar from "./ChatSidebar";
import ChatMessage, { ChatMsg } from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  // Correct hook from Clerk
  const { isLoaded, isSignedIn, user } = useUser();

  // Guards: only show loading until Clerk is loaded; then sign in prompt if not signed in
  if (!isLoaded) return <div>Loading…</div>;
  if (!isSignedIn || !user) return <div>Please sign in to use chat.</div>;

  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [room] = useState("default");
  const windowRef = useRef<HTMLDivElement>(null);

  // Fetch history on mount
  useEffect(() => {
    fetch("/api/chat/history")
      .then((r) => r.json())
      .then((arr) => setMsgs(arr))
      .catch(() => setMsgs([])); // fallback to empty if error
  }, []);

  // Subscribe Pusher on mount
  useEffect(() => {
    const p = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = p.subscribe("chat");
    channel.bind("new-message", (msg: ChatMsg) => {
      setMsgs((m) => [...m, msg]);
    });
    return () => {
      channel.unbind_all();
      p.unsubscribe("chat");
      p.disconnect();
    };
  }, []);

  // Scroll chat to bottom when new message comes in
  useEffect(() => {
    windowRef.current?.scrollTo(0, windowRef.current.scrollHeight);
  }, [msgs]);

  // Handle sending message (text and optional file)
  const send = async ({
    text,
    file,
  }: {
    text?: string;
    file?: File;
  }) => {
    let fileData: string | undefined = undefined;
    if (file) {
      fileData = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.readAsDataURL(file);
      });
    }
    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room,
        senderId: user.id,
        senderName: user.fullName,
        senderAvatar: user.imageUrl, // Clerk v4: user.imageUrl is the correct prop!
        text,
        file: fileData,
      }),
    });
  };

  // Chat UI
  return (
    <div className="flex h-full">
      <ChatSidebar onSelect={() => {}} />
      <div className="flex-1 flex flex-col">
        <div
          ref={windowRef}
          className="flex-1 overflow-auto p-4 bg-gray-50"
        >
          {msgs.map((m) => (
            <ChatMessage key={m.id} msg={m} me={{ userId: user.id }} />
          ))}
        </div>
        <ChatInput onSend={send} />
      </div>
    </div>
  );
}
