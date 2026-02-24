import { ResumeValues } from "@/lib/schemas/resume";

interface TemplateProps {
  data: ResumeValues;
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex gap-3 text-[10px]">
    <div className="w-40 text-slate-700">{label}</div>
    <div className="w-5 text-center text-slate-500">:</div>
    <div className="flex-1 font-semibold text-slate-900">{value ?? ""}</div>
  </div>
);

export default function BiodataHtmlTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-[10px] leading-[1.5] text-slate-900 font-sans p-8">
      <div className="mb-4">
        <div className="bg-[#b4c7e7] px-2 py-1 text-[24px] font-bold uppercase">
          {data.personalInfo.fullName || "Name"}
        </div>
        <div className="px-2 text-[10px] text-slate-800">
          Address: {data.personalInfo.location || ""}
        </div>
        <div className="px-2 text-[10px] text-slate-800">
          Contact #: {data.personalInfo.phone?.toString() || ""}
        </div>
      </div>

      <div className="mt-4 bg-[#b4c7e7] px-2 py-1 text-[12px] font-bold uppercase">
        Personal Information
      </div>
      <div className="mt-3 space-y-1">
        <Row label="Age" value={data.personalInfo.age} />
        <Row label="Date of Birth" value={data.personalInfo.dateOfBirth} />
        <Row label="Place of Birth" value={data.personalInfo.placeOfBirth} />
        <Row label="Civil Status" value={data.personalInfo.civilStatus} />
        <Row label="Religion" value={data.personalInfo.religion} />
        <Row label="Height" value={data.personalInfo.height} />
        <Row label="Weight" value={data.personalInfo.weight} />
        <Row label="Citizenship" value={data.personalInfo.citizenship} />
        <Row label="Father's Name" value={data.personalInfo.fathersName} />
        <Row label="Occupation" value={data.personalInfo.fathersOccupation} />
        <Row label="Mother's Name" value={data.personalInfo.mothersName} />
        <Row label="Occupation" value={data.personalInfo.mothersOccupation} />
      </div>

      <div className="mt-6 bg-[#b4c7e7] px-2 py-1 text-[12px] font-bold uppercase">
        Educational Attainment
      </div>
      <div className="mt-3 space-y-2">
        {data.education.length > 0 ? (
          data.education.map((edu) => (
            <div key={edu.id} className="flex gap-3">
              <div className="w-40 text-slate-700">{edu.degree || "Degree"}</div>
              <div className="w-5 text-center text-slate-500">:</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {edu.institution || ""}
                </div>
                <div className="text-[9px] text-slate-600">
                  S.Y. {edu.startDate} - {edu.current ? "Present" : edu.endDate || ""}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Row label="Education" value="" />
        )}
      </div>

      <div className="mt-6 bg-[#b4c7e7] px-2 py-1 text-[12px] font-bold uppercase">
        Work Experience
      </div>
      <div className="mt-3 space-y-2">
        {data.experience.length > 0 ? (
          data.experience.map((exp) => (
            <div key={exp.id} className="flex gap-3">
              <div className="w-40 text-slate-700">{exp.role || "Position"}</div>
              <div className="w-5 text-center text-slate-500">:</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {exp.company || ""}
                </div>
                <div className="text-[9px] text-slate-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate || ""}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            <Row label="Company" value="" />
            <Row label="Positions" value="" />
            <Row label="Year" value="" />
          </div>
        )}
      </div>

      <div className="mt-6 bg-[#b4c7e7] px-2 py-1 text-[12px] font-bold uppercase">
        Character Reference
      </div>
      <div className="mt-3 space-y-3">
        {data.characterReferences.length > 0 ? (
          data.characterReferences.map((ref) => (
            <div key={ref.id} className="space-y-0.5">
              <div className="font-semibold text-slate-900">{ref.name || ""}</div>
              <div className="text-[9px] text-slate-600">{ref.occupation || ""}</div>
              <div className="text-[9px] text-slate-600">{ref.address || ""}</div>
            </div>
          ))
        ) : (
          <div className="space-y-0.5">
            <div className="font-semibold text-slate-900">Name</div>
            <div className="text-[9px] text-slate-600">Occupation</div>
            <div className="text-[9px] text-slate-600">Address</div>
          </div>
        )}
      </div>

      <p className="mt-8 indent-8 text-[10px] text-slate-800">
        I hereby certify that the above information is true and correct to the
        best of my knowledge and belief.
      </p>
    </div>
  );
}
