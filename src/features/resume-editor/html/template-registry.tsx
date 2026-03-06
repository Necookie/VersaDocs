import { ResumeValues } from "@/lib/schemas/resume";
import FormalHtmlTemplate from "@/templates/html/formal-template";
import BiodataHtmlTemplate from "@/templates/html/biodata-template";

interface TemplateProps {
  data: ResumeValues;
}

export const getTemplatePreview = ({ data }: TemplateProps) => {
  if (data.templateId === "biodata") {
    return <BiodataHtmlTemplate data={data} />;
  }

  return <FormalHtmlTemplate data={data} />;
};
