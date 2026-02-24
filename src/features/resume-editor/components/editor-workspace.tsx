"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useResumeStore } from "@/store/useResumeStore";
import { RESUME_STORAGE_KEY } from "@/features/resume-editor/constants/storage";
import { ResumeTemplateId } from "@/lib/schemas/resume";
import { ResumeForm } from "@/components/resume-form";

const ResumePreview = dynamic(() => import("@/components/resume-preview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-slate-400">
      Loading PDF Engine...
    </div>
  ),
});

const ResumeDownloadButton = dynamic(
  () =>
    import("@/components/resume-download-button").then(
      (mod) => mod.ResumeDownloadButton
    ),
  {
    ssr: false,
  }
);

export function EditorWorkspace() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);

  // Increased to 1200ms to eliminate flickering while typing
  const debouncedPreviewData = useDebounce(resumeData, 1200);
  const debouncedResumeData = useDebounce(resumeData, 1200);

  useEffect(() => {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(debouncedResumeData));
  }, [debouncedResumeData]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResumeData({
      ...resumeData,
      templateId: e.target.value as ResumeTemplateId,
    });
  };

  return (
    <main className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#F8FAFC]">
      {/* UNIFIED TOP NAVBAR */}
      <nav className="h-16 shrink-0 bg-white border-b border-slate-200/60 flex items-center justify-between px-6 shadow-sm z-50">
        {/* Left Nav (Branding & Back Navigation) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center h-8 w-8 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">VersaDocs Editor</h1>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Fill in details to generate PDF</p>
          </div>
        </div>

        {/* Right Nav (Preview Controls) */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-tight hidden sm:block">Live Preview</span>
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          <div className="flex items-center bg-slate-50 rounded-md border border-slate-200/60 p-1">
            <span className="text-xs font-semibold text-slate-500 px-3 uppercase tracking-wider">Template:</span>
            <select
              value={resumeData.templateId}
              onChange={handleTemplateChange}
              className="text-sm font-medium border-none bg-white shadow-sm rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
            >
              <option value="formal">Formal</option>
              <option value="biodata">Biodata</option>
            </select>
          </div>
        </div>
      </nav>

      {/* TWO COLUMN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Column: Editor Form */}
        {/* Applied no-scrollbar to hide the ugly scroll pipeline while keeping it scrubbable */}
        <section className="w-1/2 h-full bg-white overflow-y-auto no-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
          <div className="p-8 max-w-2xl mx-auto pt-10">
            <ResumeForm onUpdate={setResumeData} defaultData={resumeData} />
          </div>
        </section>

        {/* Right Column: Preview Canvas */}
        <section className="w-1/2 h-full flex flex-col bg-slate-100/50 p-6 relative">
          <div className="flex-1 overflow-hidden flex justify-center items-start shadow-xl rounded-lg ring-1 ring-slate-200/50">
            <ResumePreview resumeData={debouncedPreviewData} />
          </div>

          <div className="absolute bottom-10 right-10 z-30">
            <ResumeDownloadButton data={resumeData} />
          </div>
        </section>
      </div>
    </main>
  );
}
