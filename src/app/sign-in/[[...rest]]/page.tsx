import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";

/**
 * Sign In Page (`/sign-in`)
 * Renders the Clerk UI for user authentication within a centered, styled container.
 */
export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <SignIn />
    </div>
  );
}