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
  const debouncedResumeData = useDebounce(resumeData, 1000);

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
    <main className="flex h-[100dvh] w-full overflow-hidden bg-[#F8FAFC]">
      <section className="w-1/2 h-full bg-white overflow-y-auto scrollbar-thin shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="mr-4 text-slate-500 hover:text-slate-900 transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Editor</h1>
              <p className="text-sm text-slate-500">Fill in your details to generate the PDF.</p>
            </div>
          </div>
          <ResumeForm onUpdate={setResumeData} defaultData={resumeData} />
        </div>
      </section>

      <section className="w-1/2 h-full flex flex-col bg-slate-100/50">
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

        <div className="flex items-center justify-end px-8 py-4 bg-transparent absolute bottom-6 right-6 z-30">
          <ResumeDownloadButton data={resumeData} />
        </div>

        <div className="flex-1 overflow-hidden p-4 flex items-center justify-center">
          <ResumePreview resumeData={resumeData} />
        </div>
      </section>
    </main>
  );
}
