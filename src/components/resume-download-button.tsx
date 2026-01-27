"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import FormalTemplate from "@/templates/formal-template"; // Import your specific template
import { ResumeValues } from "@/lib/schemas/resume";
import { Download } from "lucide-react";

// Assuming you have a basic Button component (if not, use a standard <button>)
import { Button } from "@/components/ui/button"; 

interface DownloadButtonProps {
  data: ResumeValues;
}

export const ResumeDownloadButton = ({ data }: DownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<FormalTemplate data={data} />}
      fileName={`${data.personalInfo.fullName || "resume"}.pdf`} // Dynamic filename
    >
      {/* The child of PDFDownloadLink is a function that tells you 
         if the PDF is still loading or ready.
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