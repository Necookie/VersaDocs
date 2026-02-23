"use client"
import { ResumeForm } from "@/components/resume-form"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { ResumeValues } from "@/lib/schemas/resume"
import Link from 'next/link'
import dynamic from "next/dynamic"

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
 * The page maintains the top-level state of `resumeData`, passing it downwards.
 */
export default function EditorPage() {
  // 1. Maintain global state of the entire resume form JSON structure
  const [resumeData, setResumeData] = useState<ResumeValues>(getInitialData);

  // 2. Persist state to localStorage silently across re-renders
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResumeData(prev => ({
      ...prev,
      templateId: e.target.value as "formal" | "biodata"
    }));
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* LEFT PANEL: The Settings/Input Form */}
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

          {/* THE FORM: Exposes the setResumeData setter to the form's watch hook internally to push state up */}
          <ResumeForm onUpdate={setResumeData} />
        </div>
      </section>

      {/* RIGHT PANEL: Live Visual Preview Canvas */}
      <section className="w-1/2 h-full flex flex-col">

        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <span className="text-sm font-medium text-slate-600">Live Preview</span>
          <div className="flex items-center gap-4">
            <select
              value={resumeData.templateId}
              onChange={handleTemplateChange}
              className="text-sm border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="formal">Formal Template</option>
              <option value="biodata">Filipino Biodata</option>
            </select>
            <div className="text-xs font-mono text-slate-400">A4 - Portrait</div>
          </div>
        </div>

        {/* Action Button Row: Download PDF Trigger */}
        <div className="flex items-center justify-end pt-5 pr-5 border-b border-slate-200 bg-white">
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