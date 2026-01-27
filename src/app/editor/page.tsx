"use client"
import { ResumeForm } from "@/components/resume-form"
import { ChevronLeft } from "lucide-react"
import { useState} from "react"
import { ResumeValues } from "@/lib/schemas/resume"
import ResumePreview from "@/components/resume-preview"
import  Link  from 'next/link'

const defaultResumeData: ResumeValues = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        website: "",
    },
    education: [],
    experience: [],
}; 


export default function EditorPage() {
    const [resumeData, setResumeData] = useState<ResumeValues>(defaultResumeData);

  

    return (

       <main className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      {/* --- LEFT PANEL: The Editor */}
      <section className="w-1/2 h-full border-r border-slate-200 bg-white overflow-y-auto scrollbar-thin">
        <div className="p-6">
          
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link href="/" className="mr-4 text-slate-500 hover:text-slate-900 transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Editor</h1>
              <p className="text-sm text-slate-500">Fill in your details to generate the PDF.</p>
            </div>
          </div>

          {/* THE FORM: We pass the "setResumeData" function so it can update the state */}
          <ResumeForm onUpdate={setResumeData} />
          
        </div>
      </section>

      {/* --- RIGHT PANEL: The Preview (Fixed) --- */}
      <section className="w-1/2 h-full bg-slate-900 flex flex-col">
        
        {/* Simple Toolbar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
           <span className="text-sm font-medium text-slate-600">Live Preview</span>
           <div className="text-xs font-mono text-slate-400">A4 - Portrait</div>
        </div>

        {/* THE PREVIEW: We pass the "resumeData" so it can display it */}
        <div className="flex-1 overflow-hidden p-8 flex items-center justify-center">
            <ResumePreview resumeData={resumeData} />
        </div>

      </section>

    </main>
    )
}