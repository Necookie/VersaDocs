import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center p-6 shadow-xl bg-white'>
      <div className='flex gap-2 ml-20'>
        <p className = 'text-2xl font-semibold'>VersaDocs</p>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Only show "Sign In" if logged out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="font-bold hover:text-blue-600">Sign in</button>
          </SignInButton>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </SignedOut>

        {/* Only show User Menu if logged in */}
        <SignedIn>
          <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
          <Link href="/templates" className="text-gray-600 hover:text-black">Templates</Link>
          <Link href="/Pricing" className="text-gray-600 hover:text-black">Upgrade</Link>
          <Link href="/editor" className="text-gray-600 hover:text-black">Editor</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}