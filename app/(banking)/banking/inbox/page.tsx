"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import { useUser } from "@clerk/nextjs";

export default function InboxPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Only load if Clerk is ready AND user is signed in
  if (!isLoaded) return <div>Loading…</div>;
  if (!isSignedIn || !user) return <div>Not signed in</div>;

  return (
    <div className="h-screen">
      <ChatWindow user={user} />
    </div>
  );
}
