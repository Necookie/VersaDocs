import { SignUp } from "@clerk/nextjs";

export const runtime = "edge";

/**
 * Sign Up Page (`/sign-up`)
 * Renders the Clerk UI for user registration within a centered, styled container.
 */
export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <SignUp />
    </div>
  );
}