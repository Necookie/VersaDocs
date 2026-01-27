"use-client" //  indicates that this file is a client-side component in a Next.js application.

import { PDFViewer } from "@react-pdf/renderer"
import { ResumeValues } from "@/lib/schemas/resume"
import FormalTemplate from "@/templates/formal-template"

interface ResumePreviewProps {
    resumeData: ResumeValues
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {

    return (
        <div className= "w-full h-full bg-slate-900 p-4 md:p-8 flex items-center">
            {/* key={JSON.stringify(data)} This forces the PDF to fully re-render whenever data changes. Without this, the PDF engine sometimes "lagging" behind your typing*/}
            <PDFViewer 
            key ={JSON.stringify(resumeData)}
            className="w-full h-full min-h-[500px] rounded-lg shadow-xl border border-slate-700"
            showToolbar={true}
            >
                <FormalTemplate data={resumeData}/>
            </PDFViewer>
        </div>
    )
}