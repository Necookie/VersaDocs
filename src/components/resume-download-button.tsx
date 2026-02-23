"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import FormalTemplate from "@/templates/formal-template";
import BiodataTemplate from "@/templates/biodata-template";
import { ResumeValues } from "@/lib/schemas/resume";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Interface defining the props for the ResumeDownloadButton component.
 * It requires the validated resume form values to construct the PDF.
 */
interface DownloadButtonProps {
  data: ResumeValues;
}

/**
 * A client-side component that renders a button to generate and download a PDF compilation of the user's resume.
 * Utilizes @react-pdf/renderer to asynchronously build the PDF file.
 * 
 * @param {DownloadButtonProps} props - The complete state of the user's customized resume.
 */
export const ResumeDownloadButton = ({ data }: DownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={data.templateId === "biodata" ? <BiodataTemplate data={data} /> : <FormalTemplate data={data} />}
      fileName={`${data.personalInfo.fullName || "resume"}.pdf`} // Dynamic filename based on user input
    >
      {/* The child of PDFDownloadLink provides a render state callback.
          `loading` is true while @react-pdf/renderer is assembling the PDF blob.
      */}
      {({ loading }) => (
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          className="gap-2"
        >
          <Download size={16} />
          {loading ? "Preparing..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};