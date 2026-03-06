"use client"; // Indicates that this file is a client-side component in a Next.js application

import { useMemo } from "react";
import { ResumeValues } from "@/lib/schemas/resume";
import { getTemplatePreview } from "@/features/resume-editor/html/template-registry";

/**
 * Props for ResumePreview component
 */
interface ResumePreviewProps {
    resumeData: ResumeValues
}

/**
 * Component that renders a live HTML/CSS preview of the resume template.
 * 
 * @param {ResumePreviewProps} props - The complete state of the user's customized resume.
 */
export default function ResumePreview({ resumeData }: ResumePreviewProps) {
    const preview = useMemo(
        () => getTemplatePreview({ data: resumeData }),
        [resumeData]
    );

    return (
        <div className="w-full h-full overflow-auto rounded-md bg-[#F8FAFC]">
            <div className="flex justify-center py-6">
                <div className="w-[794px] min-h-[1123px] bg-white shadow-lg ring-1 ring-slate-200/60">
                    {preview}
                </div>
            </div>
        </div>
    );
}
