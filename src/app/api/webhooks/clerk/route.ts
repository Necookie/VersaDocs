import {
  handleSupportedClerkEvent,
  verifyClerkWebhook,
} from "@/features/auth/clerk-webhook";

/**
 * Endpoint: `/api/webhooks/clerk`
 * Purpose: Securely receives real-time events from Clerk (like user sign-ups or deletions).
 */
export async function POST(req: Request) {
  const verification = await verifyClerkWebhook(req);
  if (verification.errorResponse) {
    return verification.errorResponse;
  }

  if (!verification.event) {
    return new Response("Error: Invalid Signature", {
      status: 400,
    });
  }

  handleSupportedClerkEvent(verification.event);

  return new Response(JSON.stringify({ message: "Webhook processed successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
