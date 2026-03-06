"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import { ResumeValues } from "@/lib/schemas/resume";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateDocument } from "@/features/resume-editor/pdf/template-registry";

/**
 * Interface defining the props for the ResumeDownloadButton component.
 * It requires the validated resume form values to construct the PDF.
 */
interface DownloadButtonProps {
  data: ResumeValues;
  debouncedData: ResumeValues;
}

/**
 * A client-side component that renders a button to generate and download a PDF compilation of the user's resume.
 * Utilizes @react-pdf/renderer to asynchronously build the PDF file from debounced data.
 * 
 * @param {DownloadButtonProps} props - The complete state of the user's customized resume.
 */
export const ResumeDownloadButton = ({ data, debouncedData }: DownloadButtonProps) => {
  const { personalInfo } = data;
  const fileName = `${personalInfo.fullName || "resume"}.pdf`;
  const debouncedSignature = useMemo(
    () => JSON.stringify(debouncedData),
    [debouncedData]
  );
  const liveSignature = useMemo(
    () => JSON.stringify(data),
    [data]
  );
  const [pendingData, setPendingData] = useState<ResumeValues | null>(null);
  const pendingDownload = Boolean(pendingData);
  const pendingSignature = useMemo(
    () => (pendingData ? JSON.stringify(pendingData) : null),
    [pendingData]
  );
  const generationData = pendingData ?? debouncedData;
  const generationSignature = pendingSignature ?? debouncedSignature;
  const [instance] = usePDF({
    document: getTemplateDocument({ data: generationData }),
  });
  const pendingSignatureRef = useRef<string | null>(null);
  const lastRequestedSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    lastRequestedSignatureRef.current = generationSignature;
  }, [generationSignature]);

  useEffect(() => {
    if (!pendingDownload || instance.loading || !instance.url) {
      return;
    }
    if (pendingSignatureRef.current !== lastRequestedSignatureRef.current) {
      return;
    }
    const link = document.createElement("a");
    link.href = instance.url;
    link.download = fileName;
    link.click();
    setPendingData(null);
    pendingSignatureRef.current = null;
  }, [pendingDownload, instance.loading, instance.url, fileName]);

  const handleDownload = () => {
    if (!instance.loading && instance.url && generationSignature === liveSignature) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = fileName;
      link.click();
      return;
    }
    setPendingData(data);
    pendingSignatureRef.current = liveSignature;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={instance.loading}
      className="gap-2"
      onClick={handleDownload}
    >
      <Download size={16} />
      {instance.loading ? "Preparing..." : "Download PDF"}
    </Button>
  );
};
