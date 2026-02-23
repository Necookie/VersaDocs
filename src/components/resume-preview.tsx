"use client" // Indicates that this file is a client-side component in a Next.js application

import { PDFViewer } from "@react-pdf/renderer"
import { ResumeValues } from "@/lib/schemas/resume"
import { getTemplateDocument } from "@/features/resume-editor/pdf/template-registry"

/**
 * Props for ResumePreview component
 */
interface ResumePreviewProps {
    resumeData: ResumeValues
}

/**
 * Component that renders a live preview of the generated resume PDF using @react-pdf/renderer.
 * React-PDF renders an iframe natively.
 * 
 * @param {ResumePreviewProps} props - The complete state of the user's customized resume.
 */
export default function ResumePreview({ resumeData }: ResumePreviewProps) {

    return (
        <div className="w-full h-full">
            {/* 
              key={JSON.stringify(resumeData)} 
              This forces the PDFViewer to fully re-render whenever the form data changes. 
              Without this key prop, the PDF engine can lag behind the user's typing.
            */}
            <PDFViewer
                key={JSON.stringify(resumeData)}
                className="w-full h-full border-0"
                showToolbar={false}
            >
                {getTemplateDocument({ data: resumeData })}
            </PDFViewer>
        </div>
    )
}
