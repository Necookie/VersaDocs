import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Download, LayoutTemplate, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const runtime = "edge";

/**
 * Root Home Page (`/`) - The application's main landing page.
 * Showcases features, highlights the editor's capabilities, and routes users to the editor or examples.
 */
export default function Home() {
  return (
    <main>
      {/* 1. Navbar Container (Floating) */}
      <section className='fixed top-0 left-0 w-full z-50 '>
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </section>

      {/* 2. Hero Section: Primary call to action and value proposition */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Minimalist Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">

          <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border px-5 py-2 rounded-full text-sm font-medium text-muted-foreground mb-8">
            <Sparkles className="size-4 text-indigo-600" />
            AI-Powered Resume Builder
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-8">
            Create Your Perfect Resume in Minutes
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Build professional, ATS-friendly resumes with an intuitive modern workspace. Choose
            from premium templates, customize seamlessly, and export instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full hover:text-indigo-600 shadow-sm transition-transform hover:scale-105 active:scale-95 ">
              <Link href="/editor">Start Building Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full shadow-sm transition-transform hover:scale-105 active:scale-95 bg-background">
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>

          <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
            No credit card required <span className="w-1 h-1 rounded-full bg-border" /> Free forever
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to make resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Template Feature */}
            <Card className="bg-card border shadow-sm rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <LayoutTemplate className="size-6 text-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground mb-3">
                  Multiple Templates
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  Choose from diverse professional templates designed by top recruiters. Switch templates instantly without losing any data.
                </CardDescription>
              </CardContent>
            </Card>

            {/* AI Suggestion Feature */}
            <Card className="bg-card border shadow-sm rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="size-6 text-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground mb-3">
                  AI Content Engine
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  Get smart suggestions for bullet points and technical skills. Our conversational AI helps you write highly compelling descriptions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Export Feature */}
            <Card className="bg-card border shadow-sm rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
                  <Download className="size-6 text-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground mb-3">
                  Export Anywhere
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
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
