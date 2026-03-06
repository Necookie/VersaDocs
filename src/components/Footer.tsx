import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
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
        <section className="relative overflow-hidden bg-gray-50 py-30 px-4 border-b border-gray-100">
          {/* Dot pattern background */}
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative max-w-3xl mx-auto text-center z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Ready to Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-950">
                Professional Resume?
              </span>
            </h2>
            <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed mb-14">
              Join thousands of job seekers who landed their dream job with VersaDocs.
            </p>
            <SignInButton mode="modal">
            <Button
              asChild
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 h-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm font-semibold"
            >
              <Link href="">Start Building Now — It&apos;s Free →</Link>
            </Button>
            </SignInButton>
          </div>
        </section>
      </SignedOut>

      {/* Logged In CTA - Welcomes users back and directs them to app features */}
      <SignedIn>
        <section className="relative overflow-hidden bg-gray-50 py-30 px-4 border-b border-gray-100">
          {/* Dot pattern background */}
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative max-w-3xl mx-auto text-center z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Continue Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-950">
                Career Journey
              </span>
            </h2>
            <p className="text-base text-gray-500 mb-14 max-w-xl mx-auto leading-relaxed">
              Your next opportunity is just around the corner. Keep your resume polished and stay ready for what&apos;s next.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 px-8 h-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm font-semibold"
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 h-12 rounded-full transition-all hover:scale-105 active:scale-95 font-semibold"
              >
                <Link href="/editor">Open Editor</Link>
              </Button>
            </div>
          </div>
        </section>
      </SignedIn>

      {/* Footer Links Section - Navigation and Company Information */}
      <section className="bg-black text-gray-300 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Brand Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
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
