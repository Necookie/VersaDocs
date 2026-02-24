"use client"; // Indicates that this file is a client-side component in a Next.js application

import { useEffect, useMemo, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import { ResumeValues } from "@/lib/schemas/resume";
import { getTemplateDocument } from "@/features/resume-editor/pdf/template-registry";

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
    const document = useMemo(
        () => getTemplateDocument({ data: resumeData }),
        [resumeData]
    );
    const [instance] = usePDF({ document });

    // We maintain a stack of loaded blobs to prevent changing the `src` attribute 
    // of an already-mounted iframe, which is the root cause of native PDF flickering.
    const [loadedUrls, setLoadedUrls] = useState<string[]>([]);
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);

    useEffect(() => {
        // When a new PDF blob is generated
        if (!instance.loading && instance.url) {
            // Append hash parameters to hide the Chrome/Edge built-in PDF toolbar and scrollbars
            const cleanUrl = `${instance.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

            // First ever load: render immediately
            if (loadedUrls.length === 0 && !pendingUrl) {
                setLoadedUrls([cleanUrl]);
            }
            // Subsequent loads: push to pending to render an invisible buffer iframe
            else if (loadedUrls[loadedUrls.length - 1] !== cleanUrl && pendingUrl !== cleanUrl) {
                setPendingUrl(cleanUrl);
            }
        }
    }, [instance.loading, instance.url, loadedUrls, pendingUrl]);

    const handleIframeLoad = (url: string) => {
        if (url === pendingUrl) {
            // Once the buffer iframe has fully loaded the PDF, add it to the visible stack.
            // We only keep the last 2 URLs to prevent DOM bloat and memory leaks.
            setLoadedUrls((prev) => [...prev, url].slice(-2));
            setPendingUrl(null);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden rounded-md bg-[#F8FAFC]">
            {/* 
               THE CROP HACK
               We wrap the iframes in an absolute container that is larger than the parent div,
               and we push it up and left using negative margins.
               This physically pushes the native browser PDF toolbar and scrollbar outside of
               the visible rounded window, completely hiding them.
             */}
            <div className="absolute top-[-55px] left-0 w-[calc(100%+16px)] h-[calc(100%+55px)]">
                {/* The stack of fully loaded iframes */}
                {loadedUrls.map((url, index) => {
                    const isCurrent = index === loadedUrls.length - 1;
                    return (
                        <iframe
                            key={url} // The unique URL acts as the key so React never reuses the iframe DOM node
                            title={`Resume Preview ${index}`}
                            className={`w-full h-full border-0 absolute top-0 left-0 transition-opacity duration-300 pointer-events-auto ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            src={url}
                        />
                    );
                })}

                {/* The hidden buffer iframe that natively loads the PDF in the background */}
                {pendingUrl && (
                    <iframe
                        key={pendingUrl}
                        title="Resume Preview Buffer"
                        // Loaded invisibly holding z-[-1]
                        className="w-full h-full border-0 absolute top-0 left-0 opacity-0 pointer-events-none z-[-1]"
                        src={pendingUrl}
                        onLoad={() => handleIframeLoad(pendingUrl)}
                    />
                )}
            </div>
        </div>
    )
}
