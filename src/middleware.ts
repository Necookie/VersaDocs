import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Define which routes are "Public" (Anyone can see them without authentication).
 * - `/`: Landing page
 * - `/sign-in(.*)`: Sign in page and its subroutes
 * - `/sign-up(.*)`: Sign up page and its subroutes
 */
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

/**
 * Main Clerk authentication middleware hook.
 * Executes on every request to determine access rules.
 */
export default clerkMiddleware(async (auth, request) => {
  // If the user tries to access a route that IS NOT listed in `isPublicRoute` (e.g. `/editor`),
  // intercept the request and redirect them to the Clerk Sign-In portal.
  if (!isPublicRoute(request)) {
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