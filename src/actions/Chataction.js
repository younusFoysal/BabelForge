"use server";

import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_SECRET_KEY
);

export const createToken = async (userId) => {
  return serverClient.createToken(userId);
};
