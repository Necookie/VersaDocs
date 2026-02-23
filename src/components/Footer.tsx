import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { footerLinkGroups } from "@/features/marketing/navigation/links";
import { FileText } from "lucide-react";
import Link from "next/link";

/**
 * Standard global Footer component used across the application.
 * Contains a Call-to-Action (CTA) section and standard footer navigation links.
 */
export default function Footer() {
  return (
    <footer>
      {/* Logged Out CTA - Encourages visitors to start using the app */}
      <SignedOut>
        <section className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of job seekers who landed their dream job
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 transition-all hover:scale-105 active:scale-95 h-12 rounded-full"
            >
              <Link href="/editor">Start Building Now - It&apos;s Free</Link>
            </Button>
          </div>
        </section>
      </SignedOut>

      {/* Logged In CTA - Welcomes users back and directs them to app features */}
      <SignedIn>
        <section className="relative overflow-hidden bg-gray-950 py-12 px-4 border-b border-gray-800">
          {/* Animated gradient background - very sleek */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/40 to-zinc-900 z-0" />

          <div className="relative max-w-3xl mx-auto text-center z-10">
            <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Welcome Back
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Continue Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">
                Career Journey
              </span>
            </h2>
            <p className="text-base text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Your next big opportunity is just around the corner. Keep your resume polished and stay ready for what&apos;s next.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                className="bg-white text-zinc-900 hover:bg-zinc-100 px-6 h-10 md:h-11 md:px-8 rounded-full w-full sm:w-auto shadow-lg transition-all hover:scale-105 active:scale-95 font-semibold"
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button
                asChild
                className="bg-white/5 text-white border border-white/10 hover:bg-white/10 px-6 h-10 md:h-11 md:px-8 rounded-full w-full sm:w-auto transition-all hover:scale-105 active:scale-95 backdrop-blur-sm font-semibold"
              >
                <Link href="/editor">Open Editor</Link>
              </Button>
            </div>
          </div>
        </section>
      </SignedIn>

      {/* Footer Links Section - Navigation and Company Information */}
      <section className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Brand Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="size-6 text-white" />
                <span className="text-xl font-semibold text-white">VersaDocs</span>
              </div>
              <p className="text-gray-400">Build professional resumes in minutes</p>
              <p className="mt-3 inline-flex rounded-full border border-zinc-500/40 bg-zinc-500/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                Project currently in development
              </p>
            </div>

            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-white font-semibold mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright text */}
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2026 VersaDocs. All rights reserved.</p>
            <p className="mt-2 text-xs text-gray-500">
              Legal documents are temporary while the service remains in development.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
