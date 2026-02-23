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
      {/* 1. Navbar Container (Floating) */}
      <section className='fixed top-0 left-0 w-full z-50 pointer-events-none'>
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </section>

      {/* 2. Hero Section: Primary call to action and value proposition */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Decorative Background Gradient Mesh */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6366f1_100%)] opacity-20" />

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">

          <div className="inline-flex items-center gap-2 bg-indigo-50/50 backdrop-blur-sm border border-indigo-100/50 px-5 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-8 shadow-sm">
            <Sparkles className="size-4 animate-pulse" />
            AI-Powered Resume Builder
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8">
            Create Your Perfect Resume in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Minutes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build professional, ATS-friendly resumes with an intuitive modern workspace. Choose
            from premium templates, customize seamlessly, and export instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white px-10 text-lg rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95">
              <Link href="/editor">Start Building Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-gray-200 hover:bg-gray-50 bg-white shadow-sm transition-all hover:scale-105 active:scale-95">
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>

          <p className="text-sm font-medium text-gray-500 flex items-center justify-center gap-2">
            No credit card required <span className="w-1 h-1 rounded-full bg-gray-300" /> Free forever
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

          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to make resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Template Feature */}
            <Card className="bg-white border-0 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-inset ring-indigo-100">
                  <LayoutTemplate className="size-7 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  Multiple Templates
                </CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Choose from diverse professional templates designed by top recruiters. Switch templates instantly without losing any data.
                </CardDescription>
              </CardContent>
            </Card>

            {/* AI Suggestion Feature */}
            <Card className="bg-white border-0 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-inset ring-purple-100">
                  <Sparkles className="size-7 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  AI Content Engine
                </CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Get smart suggestions for bullet points and technical skills. Our conversational AI helps you write highly compelling descriptions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Export Feature */}
            <Card className="bg-white border-0 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-inset ring-emerald-100">
                  <Download className="size-7 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  Export Anywhere
                </CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Generate pristine, standard-compliant PDF files layouted instantly. Your resume looks completely perfect on any recruiting system.
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