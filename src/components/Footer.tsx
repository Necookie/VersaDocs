import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of job seekers who landed their dream job
          </p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8">
            <Link href="/editor">Start Building Now - It&apos;s Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer Links Section */}
      <section className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="size-6 text-white" />
                <span className="text-xl font-semibold text-white">VersaDocs</span>
              </div>
              <p className="text-gray-400">
                Build professional resumes in minutes
              </p>
            </div>

            {/* Product Links */}
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

            {/* Company Links */}
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

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 VersaDocs. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  )
}
