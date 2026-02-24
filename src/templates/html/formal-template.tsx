import { ResumeValues } from "@/lib/schemas/resume";

interface TemplateProps {
  data: ResumeValues;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mt-3 mb-2 border-b border-slate-900 text-[10px] font-semibold uppercase tracking-wide text-slate-900">
    {title}
  </div>
);

const BulletRow = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <span className="text-[10px] leading-[1.3]">&bull;</span>
    <span className="text-[10px] leading-[1.4]">{text}</span>
  </div>
);

export default function FormalHtmlTemplate({ data }: TemplateProps) {
  const contactItems = [
    data.personalInfo.phone?.toString(),
    data.personalInfo.email,
    data.personalInfo.linkedin,
    data.personalInfo.website,
    data.personalInfo.location,
  ].filter(Boolean) as string[];

  const skills = data.skills
    .flatMap((skill) =>
      Array.isArray(skill.skills) ? skill.skills : [skill.skills]
    )
    .filter(Boolean) as string[];

  return (
    <div className="bg-white text-[12px] leading-[1.5] text-slate-800 font-sans p-10">
      <div className="mb-4 border-b border-slate-900 pb-3 text-center">
        <div className="text-[24px] font-bold uppercase tracking-wide text-slate-900">
          {data.personalInfo.fullName || "Name"}
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] text-slate-600">
          {contactItems.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-2">
              <span>{item}</span>
              {index < contactItems.length - 1 && (
                <span className="text-slate-400">&bull;</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {data.personalInfo.summary && (
        <>
          <SectionTitle title="Summary" />
          <div className="text-[11px] text-slate-700">
            {data.personalInfo.summary}
          </div>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <SectionTitle title="Experience" />
          <div className="space-y-3">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[11px] font-semibold text-slate-900">
                    {job.role}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {job.startDate} - {job.current ? "Present" : job.endDate || ""}
                  </div>
                </div>
                <div className="text-[10px] italic text-slate-600">
                  {job.company}
                </div>
                <div className="mt-2 space-y-1">
                  {job.description.map((point, index) => (
                    <BulletRow key={`${job.id}-desc-${index}`} text={point} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {data.education.length > 0 && (
        <>
          <SectionTitle title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[11px] font-semibold text-slate-900">
                    {edu.degree}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate || ""}
                  </div>
                </div>
                <div className="text-[10px] italic text-slate-600">
                  {edu.institution}
                </div>
                <div className="mt-2 space-y-1">
                  {edu.description.map((point, index) => (
                    <BulletRow key={`${edu.id}-desc-${index}`} text={point} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle title="Skills" />
          <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-semibold text-slate-800">
            {skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="flex items-center gap-2">
                <span>&bull;</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {data.projects.length > 0 && (
        <>
          <SectionTitle title="Projects" />
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-start gap-2 text-[11px] font-semibold text-slate-900">
                  <span>{project.title}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-[10px] font-normal text-slate-500">
                    {project.startDate}
                  </span>
                </div>
                <div className="text-[10px] italic text-slate-600">
                  {project.role}
                </div>
                <div className="mt-2 space-y-1">
                  {project.description.map((point, index) => (
                    <BulletRow key={`${project.id}-desc-${index}`} text={point} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
