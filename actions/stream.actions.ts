"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const secret = process.env.STREAM_SECRET_KEY as string;

export const TokenProvider = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!apiKey || !secret) {
    throw new Error("Missing Stream API credentials");
  }

  const client = new StreamClient(apiKey, secret);

  // You can optionally add exp/iat, but they’re not required
  const token = client.generateUserToken({
    user_id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // valid for 1 hour
    iat: Math.floor(Date.now() / 1000) - 60,       // issued 1 min ago
  });

  return token
};
