"use client"
import { ResumeForm } from "@/components/resume-form"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { ResumeValues } from "@/lib/schemas/resume"
import  Link  from 'next/link'
import dynamic from "next/dynamic"

const ResumePreview = dynamic(() => import ("@/components/resume-preview"), {
    ssr: false,
    loading: () => (
     <div className="flex items-center justify-center h-full text-slate-400">
        Loading PDF Engine...
     </div>
    ),
})

const ResumeDownloadButton = dynamic(() => import ("@/components/resume-download-button").then((mod) => mod.ResumeDownloadButton), {
    ssr: false,
})
const STORAGE_KEY = "versadocs-resume-data";

const defaultResumeData: ResumeValues = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        location: "",
        website: "",
    },
    education: [],
    experience: [],
}; 

function getInitialData(): ResumeValues {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved resume data", e);
            }
        }
    }
    return defaultResumeData;
}

export default function EditorPage() {
    const [resumeData, setResumeData] = useState<ResumeValues>(getInitialData);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, [resumeData]);

  

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
      <section className="w-1/2 h-full  flex flex-col">
        
        {/* Simple Toolbar */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
           <span className="text-sm font-medium text-slate-600">Live Preview</span>
           <div className="text-xs font-mono text-slate-400">A4 - Portrait</div>
        </div>

        {/* THE PREVIEW: We pass the "resumeData" so it can display it */}
        <div className="flex items-center justify-end pt-5 border-b border-slate-200 bg-white">
            <ResumeDownloadButton data={resumeData} />
        </div>
        <div className="flex-1 overflow-hidden p-4 flex items-center justify-center">
            <ResumePreview resumeData={resumeData} />
        </div>

      </section>

    </main>
    )
}