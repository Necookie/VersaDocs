import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

/**
 * Standard global Footer component used across the application.
 * Contains a Call-to-Action (CTA) section and standard footer navigation links.
 */
export default function Footer() {
  return (
    <footer>
      {/* Logged Out CTA - Encourages visitors to start using the app */}
      <SignedOut>
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of job seekers who landed their dream job
            </p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 transition-all hover:scale-105 active:scale-95 h-12 rounded-full">
              <Link href="/editor">Start Building Now - It&apos;s Free</Link>
            </Button>
          </div>
        </section>
      </SignedOut>

      {/* Logged In CTA - Welcomes users back and directs them to app features */}
      <SignedIn>
        <section className="relative overflow-hidden bg-gray-950 py-20 px-4 border-b border-gray-800">
          {/* Animated gradient background - very sleek */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950/40 to-gray-900 z-0" />

          <div className="relative max-w-4xl mx-auto text-center z-10">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Welcome Back
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Continue Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Career Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your next big opportunity is just around the corner. Keep your resume polished and stay ready for what&apos;s next.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 h-12 md:h-14 md:px-10 rounded-full w-full sm:w-auto shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 text-base md:text-lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 px-8 h-12 md:h-14 md:px-10 rounded-full w-full sm:w-auto transition-all hover:scale-105 active:scale-95 backdrop-blur-sm text-base md:text-lg">
                <Link href="/editor">Open Editor</Link>
              </Button>
            </div>
          </div>
        </section>
      </SignedIn>

      {/* Footer Links Section - Navigation and Company Information */}
      <section className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="size-6 text-white" />
                <span className="text-xl font-semibold text-white">VersaDocs</span>
              </div>
              <p className="text-gray-400">
                Build professional resumes in minutes
              </p>
            </div>

            {/* Product Navigation Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Features</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Templates</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
                </li>
              </ul>
            </div>

            {/* Company Navigation Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">Security</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright text */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 VersaDocs. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  )
}
