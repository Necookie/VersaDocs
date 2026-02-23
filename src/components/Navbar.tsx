import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Standard global Navbar component for the application.
 * Utilizes Clerk to conditionally render navigation links based on user authentication state.
 */
export default function Navbar() {
  return (
    <nav className='flex justify-between items-center p-5 shadow-md bg-white'>
      {/* Brand / Logo */}
      <div className='flex gap-2 ml-20'>
        <p className='text-2xl font-semibold'>VersaDocs</p>
      </div>

      {/* Navigation Links & Authentication Controls */}
      <div className="flex items-center gap-6">
        {/* Only show "Sign In" and "Get Started" buttons if the user is logged out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="font-bold hover:text-blue-600">Sign in</button>
          </SignInButton>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </SignedOut>

        {/* Only show robust navigation and the User Avatar Menu if the user is authenticated */}
        <SignedIn>
          <Link href="/templates" className="text-gray-600 hover:text-black">Templates</Link>
          <Link href="/Pricing" className="text-gray-600 hover:text-black">Upgrade</Link>
          <Link href="/editor" className="text-gray-600 hover:text-black">Editor</Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}