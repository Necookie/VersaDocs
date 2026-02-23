"use client"
import { ResumeForm } from "@/components/resume-form"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { ResumeValues } from "@/lib/schemas/resume"
import Link from 'next/link'
import dynamic from "next/dynamic"
import { useResumeStore } from "@/store/useResumeStore"
import { useDebounce } from "@/hooks/useDebounce"

/**
 * Dynamically import the PDF React preview component.
 * SSR must be disabled because @react-pdf/renderer relies on browser-only APIs (like window) during render.
 */
const ResumePreview = dynamic(() => import("@/components/resume-preview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-slate-400">
      Loading PDF Engine...
    </div>
  ),
})

/**
 * Dynamically import the PDF Download button, similarly disabling SSR.
 */
const ResumeDownloadButton = dynamic(() => import("@/components/resume-download-button").then((mod) => mod.ResumeDownloadButton), {
  ssr: false,
})

// Local Storage constant key for persisting resume form state
const STORAGE_KEY = "versadocs-resume-data";

/**
 * Complete default skeleton of a resume object matching the standard ResumeValues schema.
 */
const defaultResumeData: ResumeValues = {
  templateId: "formal",
  personalInfo: {
    fullName: "",
    email: "",
    phone: undefined,
    linkedin: "",
    location: "",
    summary: "",
    website: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
    civilStatus: "",
    religion: "",
    height: "",
    weight: "",
    citizenship: "",
    fathersName: "",
    fathersOccupation: "",
    mothersName: "",
    mothersOccupation: "",
  },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  characterReferences: [],
};

/**
 * Extracts and parses any pre-existing resume data stored in the browser's localStorage.
 * Falls back to default empty schema fields on miss or parsing error.
 */
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

/**
 * EditorPage (`/editor`) - The core interactive workspace route.
 * Renders a split view with the ResumeForm component on the left and the live ResumePreview on the right.
 * State is managed globally via Zustand (`useResumeStore`).
 */
export default function EditorPage() {
  // 1. Hook into the Global Zustand Store
  const resumeData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);

  // 2. Wrap the global state in our debounce hook
  // Wait 1000ms after the user stops typing before we consider the data "stable"
  const debouncedResumeData = useDebounce(resumeData, 1000);

  // 3. Side-effect: Persist to localStorage only when the debounced state settles
  // Note: Once the database is ready, THIS is where the API endpoint fetch goes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(debouncedResumeData));
  }, [debouncedResumeData]);

  // Handle template switching directly via Global State
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResumeData({
      ...resumeData,
      templateId: e.target.value as "formal" | "biodata"
    });
  };

  return (
    <main className="flex h-[100dvh] w-full overflow-hidden bg-[#F8FAFC]">

      {/* LEFT PANEL: The Settings/Input Form */}
      <section className="w-1/2 h-full bg-white overflow-y-auto scrollbar-thin shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="p-8 max-w-2xl mx-auto">

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

          {/* THE FORM: Exposes the Zustand setter to the form's watch hook internally to push state up */}
          <ResumeForm onUpdate={setResumeData} defaultData={resumeData} />
        </div>
      </section>

      {/* RIGHT PANEL: Live Visual Preview Canvas */}
      <section className="w-1/2 h-full flex flex-col bg-slate-100/50">

        {/* Floating Canvas Header (Replaces the basic row) */}
        <div className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 shadow-sm z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            </span>
            <span className="font-semibold text-slate-700 tracking-tight">Live Preview Canvas</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <span className="text-xs font-medium text-slate-500 px-3">Template:</span>
              <select
                value={resumeData.templateId}
                onChange={handleTemplateChange}
                className="text-sm font-medium border-none bg-white shadow-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
              >
                <option value="formal">Formal</option>
                <option value="biodata">Biodata</option>
              </select>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="h-4 w-px bg-slate-300"></span>
              <div className="text-xs font-mono font-medium text-slate-400">A4 Document</div>
            </div>
          </div>
        </div>

        {/* Action Button Row: Download PDF Trigger */}
        <div className="flex items-center justify-end px-8 py-4 bg-transparent absolute bottom-6 right-6 z-30">
          <ResumeDownloadButton data={resumeData} />
        </div>

        {/* Internal React-PDF PDFViewer Canvas Component */}
        <div className="flex-1 overflow-hidden p-4 flex items-center justify-center">
          <ResumePreview resumeData={resumeData} />
        </div>
      </section>

    </main>
  )
}