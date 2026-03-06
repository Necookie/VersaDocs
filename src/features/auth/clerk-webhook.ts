import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

type SupportedEventType = "user.created" | "user.deleted";

const eventHandlers: Record<SupportedEventType, (event: WebhookEvent) => void> = {
  "user.created": (event) => {
    const { id } = event.data;
    console.log(`Webhook triggered with an ID of ${id} and type of user.created`);
    console.log("Success! Simulated creating a new user in the future database.");
  },
  "user.deleted": (event) => {
    const { id } = event.data;
    console.log(`Webhook triggered with an ID of ${id} and type of user.deleted`);
    console.log("Success! Simulated deleting a user from the future database.");
  },
};

const getSvixHeaders = async () => {
  const headerPayload = await headers();
  return {
    svixId: headerPayload.get("svix-id"),
    svixTimestamp: headerPayload.get("svix-timestamp"),
    svixSignature: headerPayload.get("svix-signature"),
  };
};

export const verifyClerkWebhook = async (
  req: Request
): Promise<{ event?: WebhookEvent; errorResponse?: Response }> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const { svixId, svixTimestamp, svixSignature } = await getSvixHeaders();
  if (!svixId || !svixTimestamp || !svixSignature) {
    return {
      errorResponse: new Response("Error: Missing Svix headers", { status: 400 }),
    };
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  try {
    const webhook = new Webhook(webhookSecret);
    const event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;

    return { event };
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return {
      errorResponse: new Response("Error: Invalid Signature", { status: 400 }),
    };
  }
};

export const handleSupportedClerkEvent = (event: WebhookEvent) => {
  const handler = eventHandlers[event.type as SupportedEventType];
  if (handler) {
    handler(event);
  } else {
    const { id } = event.data;
    console.log(`Webhook triggered with an ID of ${id} and type of ${event.type}`);
  }
};
