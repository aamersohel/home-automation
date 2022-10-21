import { defineEventHandler, readBody } from "h3";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default defineEventHandler(async (event) => {
  const { name: deviceName, value } = await readBody(event);
  pusher.trigger("my-channel", "my-event", {
    name: deviceName,
    value: value,
  });
  return {
    message: "Success",
  };
});