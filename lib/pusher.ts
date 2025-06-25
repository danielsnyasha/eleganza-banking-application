import Pusher from "pusher-js";

export function subChat(chatId: string) {
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }).subscribe(`chat-${chatId}`);
}
