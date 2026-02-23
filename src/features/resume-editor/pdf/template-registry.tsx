import { ResumeValues } from "@/lib/schemas/resume";
import FormalTemplate from "@/templates/formal-template";
import BiodataTemplate from "@/templates/biodata-template";

interface TemplateProps {
  data: ResumeValues;
}

export const getTemplateDocument = ({ data }: TemplateProps) => {
  if (data.templateId === "biodata") {
    return <BiodataTemplate data={data} />;
  }

  return <FormalTemplate data={data} />;
};
