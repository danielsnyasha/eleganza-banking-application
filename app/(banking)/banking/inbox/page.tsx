// app/inbox/page.tsx
"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import { useAuth } from "@clerk/nextjs";


export default function InboxPage() {
  const { isLoaded, user } = useAuth();
  if (!isLoaded || !user) return <div>Loading…</div>;
  return (
    <div className="h-screen">
      <ChatWindow />
    </div>
  );
}
