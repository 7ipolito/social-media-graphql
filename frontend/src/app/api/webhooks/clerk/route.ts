import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import client from "@/lib/client";
import { CREATE_USER, DELETE_USER } from "@/graphql/mutations";
import { createUser, deleteUser } from "@/lib/actions/user.action";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, image_url, username } = evt.data;

      if (!id || !email_addresses) {
        return new Response("Error occurred -- missing data", {
          status: 400,
        });
      }

      await createUser({
        clerkUserId: id,
        email: email_addresses[0].email_address,
        image: image_url,
        username: username ?? null,
      });

      return new Response("User created", { status: 200 });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      if (!id) {
        return new Response("Error occurred -- missing data", {
          status: 400,
        });
      }

      await deleteUser({
        clerkUserId: id,
      });

      return new Response("User deleted", { status: 200 });
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
