import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section>
        <Navbar />
      </section>

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-8 shadow-sm">
            <Sparkles className="size-4" />
            AI-Powered Resume Builder
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume in Minutes
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Build professional, ATS-friendly resumes with our intuitive builder. Choose
            from multiple templates, customize colors, and download as PDF instantly.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
              <Link href="/editor">Start Building Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-500">
            No credit card required • Free forever
          </p>
        </div>
      </section>
    </main>
  )
}