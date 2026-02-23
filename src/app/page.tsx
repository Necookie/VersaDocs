import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Download, LayoutTemplate, Sparkles } from 'lucide-react'
import Link from 'next/link'

/**
 * Root Home Page (`/`) - The application's main landing page.
 * Showcases features, highlights the editor's capabilities, and routes users to the editor or examples.
 */
export default function Home() {
  return (
    <main>
      {/* 1. Navbar Container (Fixed at top) */}
      <section className='fixed top-0 left-0 w-full z-50'>
        <Navbar />
      </section>

      {/* 2. Hero Section: Primary call to action and value proposition */}
      <section className="bg-blue-50 py-27 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-8 shadow-sm">
            <Sparkles className="size-4" />
            AI-Powered Resume Builder
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume in Minutes
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Build professional, ATS-friendly resumes with our intuitive builder. Choose
            from multiple templates, customize colors, and download as PDF instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
              <Link href="/editor">Start Building Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* 3. Featured Image/Template Showcase Placeholder */}
      <section>
        <div className='text-center'>
          <p>Featured image here to showcase the templates</p>
        </div>
      </section>

      {/* 4. Features Grid: Highlights core benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to make resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Template Feature */}
            <Card className="bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <LayoutTemplate className="size-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-2">
                  Multiple Templates
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Choose from 5+ professional templates designed by experts. Switch templates instantly without losing data.
                </CardDescription>
              </CardContent>
            </Card>

            {/* AI Suggestion Feature */}
            <Card className="bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="size-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-2">
                  AI Suggestions
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Get smart suggestions for bullet points and content. Our AI helps you write compelling descriptions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Export Feature */}
            <Card className="bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="size-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-2">
                  Export Anywhere
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Download as PDF, DOCX, or share a link. Your resume looks perfect on any device or platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Application Footer */}
      <Footer />
    </main>
  )
}