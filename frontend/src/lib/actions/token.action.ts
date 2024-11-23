"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function getToken(): Promise<any> {
  const { sessionId } = auth();

  if (!sessionId) {
    return { message: "Unauthorized", status: 401 };
  }

  const template = "__session";

  try {
    const token = await clerkClient().sessions.getToken(sessionId, template);

    if (!token || !token.jwt) {
      return { message: "No token available", status: 404 };
    }

    return { token: token.jwt };
  } catch (error) {
    console.error("Error fetching token:", error);
    return { message: "Failed to fetch token", status: 500 };
  }
}
