import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

/**
 * Endpoint: `/api/webhooks/clerk`
 * Purpose: Securely receives real-time events from Clerk (like user sign-ups or deletions).
 * This acts as the bridge to synchronize the future Postgres Database with Clerk's authentication state.
 */
export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Retrieve the cryptographic headers injected by Svix
    const headerPayload = await headers()
    const svix_id = (headerPayload as any).get("svix-id") as string | null
    const svix_timestamp = (headerPayload as any).get("svix-timestamp") as string | null
    const svix_signature = (headerPayload as any).get("svix-signature") as string | null

    // If there are no headers, error out immediately (prevents unauthorized access)
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400
        })
    }

    // Extract the raw JSON body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Initialize a Svix instance with the secret key
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload using the cryptographic headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error: Invalid Signature', {
            status: 400
        })
    }

    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook triggered with an ID of ${id} and type of ${eventType}`)

    // Event Router: This is where we will inject our future Drizzle ORM DB logic
    if (eventType === 'user.created') {
        // const { email_addresses, first_name } = evt.data;
        // await db.insert(users).values({ clerkId: id, email: email_addresses[0].email_address })
        console.log('✅ Success! Simulated creating a new user in the future database.')
    }

    if (eventType === 'user.deleted') {
        // await db.delete(users).where(eq(users.clerkId, id))
        console.log('🗑️ Success! Simulated deleting a user from the future database.')
    }

    return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
