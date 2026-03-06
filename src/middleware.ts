import { clerkMiddleware } from "@clerk/nextjs/server";
import { publicRouteMatcher } from "@/features/auth/public-routes";

/**
 * Define which routes are "Public" (Anyone can see them without authentication).
 * - `/`: Landing page
 * - `/sign-in(.*)`: Sign in page and its subroutes
 * - `/sign-up(.*)`: Sign up page and its subroutes
 * - `/api/webhooks(.*)`: Clerk webhook ingestion endpoint
 */
export default clerkMiddleware(async (auth, request) => {
  if (!publicRouteMatcher(request)) {
    await auth.protect();
  }
});

/**
 * Next.js Edge Middleware Config
 * Declares the path matchers that this middleware should run against.
 */
export const config = {
  matcher: [
    // Skip all Next.js internals and static files (js, css, images, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for TRPC or API routes
    '/(api|trpc)(.*)',
  ],
};
