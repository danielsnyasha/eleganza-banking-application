import Pusher from "pusher-js";
let pusher: Pusher;

export function getPusher() {
  if (!pusher) {
    Pusher.logToConsole = false;
    pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster : process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      channelAuthorization: {
          endpoint: "/api/chat/auth",
          transport: "ajax"
      }, // <- public channels for demo
    });
  }
  return pusher;
}
