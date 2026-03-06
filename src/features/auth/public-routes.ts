import { createRouteMatcher } from "@clerk/nextjs/server";

export const publicRouteMatcher = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);
