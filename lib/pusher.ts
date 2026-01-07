import PusherServer from "pusher";
import PusherClient from "pusher-js";

const appId = process.env.PUSHER_APP_ID || "";
const key = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const secret = process.env.PUSHER_SECRET || "";
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "";

if (!key) {
  console.warn("Pusher environment variables are missing. Chat features will not work.");
}

export const pusherServer = new PusherServer({
  appId: appId,
  key: key,
  secret: secret,
  cluster: cluster,
  useTLS: true,
});

export const pusherClient = new PusherClient(key, {
  cluster: cluster,
});
