import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signedInNavbarLinks } from "@/features/marketing/navigation/links";

/**
 * Standard global Navbar component for the application.
 * Utilizes Clerk to conditionally render navigation links based on user authentication state.
 */
export default function Navbar() {
  return (
    <div className="flex justify-center w-full px-4 pt-4">
      <nav className="flex justify-between items-center px-6 py-4 w-full max-w-6xl rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 z-50 transition-all">
        {/* Brand / Logo */}
        <div className="flex gap-2">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <p className="text-2xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              VersaDocs
            </p>
          </Link>
        </div>

        {/* Navigation Links & Authentication Controls */}
        <div className="flex items-center gap-6">
          {/* Only show "Sign In" and "Get Started" buttons if the user is logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="font-bold hover:text-zinc-600">Sign in</button>
            </SignInButton>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </SignedOut>

          {/* Only show robust navigation and the User Avatar Menu if the user is authenticated */}
          <SignedIn>
            {signedInNavbarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
