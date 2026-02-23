import { z } from "zod";

const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.array(z.string()),
  rawInput: z.string().optional(),
  isGenerating: z.boolean().default(false),
});

const skillsSchema = z.object({
  skills: z.array(z.string()).max(10, "You can add up to 10 skills"),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.array(z.string()).default([]),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  description: z.array(z.string()).default([]),
});

const characterReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
});

export const resumeSchema = z.object({
  templateId: z.enum(["formal", "biodata"]).default("formal"),
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.number().optional(),
    location: z.string().min(1, "Location is required"),
    summary: z.string(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    age: z.string().optional(),
    dateOfBirth: z.string().optional(),
    placeOfBirth: z.string().optional(),
    civilStatus: z.string().optional(),
    religion: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    citizenship: z.string().optional(),
    fathersName: z.string().optional(),
    fathersOccupation: z.string().optional(),
    mothersName: z.string().optional(),
    mothersOccupation: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(experienceSchema).default([]),
  skills: z.array(skillsSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  characterReferences: z.array(characterReferenceSchema).default([]),
});

export type ResumeValues = z.infer<typeof resumeSchema>;
export type ResumeTemplateId = ResumeValues["templateId"];

export const createEmptyResume = (): ResumeValues => ({
  templateId: "formal",
  personalInfo: {
    fullName: "",
    email: "",
    phone: undefined,
    location: "",
    summary: "",
    linkedin: "",
    website: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
    civilStatus: "",
    religion: "",
    height: "",
    weight: "",
    citizenship: "",
    fathersName: "",
    fathersOccupation: "",
    mothersName: "",
    mothersOccupation: "",
  },
  experience: [],
  skills: [],
  education: [],
  projects: [],
  characterReferences: [],
});

export const hydrateResumeData = (raw: unknown): ResumeValues => {
  const defaults = createEmptyResume();

  if (!raw || typeof raw !== "object") {
    return defaults;
  }

  const candidate = raw as Partial<ResumeValues>;
  return {
    ...defaults,
    ...candidate,
    personalInfo: {
      ...defaults.personalInfo,
      ...candidate.personalInfo,
    },
    experience: candidate.experience ?? defaults.experience,
    skills: candidate.skills ?? defaults.skills,
    education: candidate.education ?? defaults.education,
    projects: candidate.projects ?? defaults.projects,
    characterReferences:
      candidate.characterReferences ?? defaults.characterReferences,
  };
};
