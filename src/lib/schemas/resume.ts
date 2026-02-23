import { z } from "zod";

/**
 * Experience Section Schema
 * Defines the structure for professional job entries and AI generation states.
 */
const experienceSchema = z.object({
  id: z.string(), // Unique identifier used for React mapping keys
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false), // Indicates if this is the user's current job
  description: z.array(z.string()), // The finalized list of bullet points for the role
  // AI Specific fields: used when leveraging the AI to generate job descriptions
  rawInput: z.string().optional(), // Raw user prompt (e.g., "I fixed bugs")
  isGenerating: z.boolean().default(false), // Loading state during AI generation
});

/**
 * Skills Section Schema
 * Restricts the number of skill string inputs to a maximum of 10.
 */
const SkillsSchema = z.object({
  skills: z.array(z.string()).max(10, "You can add up to 10 skills"),
})

/**
 * Education Section Schema
 * Handles academic history details.
 */
const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false), // Indicates if user is currently enrolled
  description: z.array(z.string()).default([]), // Optional list of achievements or activities
})

/**
 * Projects Section Schema
 * Used to define standalone technical or professional projects.
 */
const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  description: z.array(z.string()).default([]), // List of project highlights
});

/**
 * Character Reference Schema
 * Necessary for the Biodata template.
 */
const characterReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
});

/**
 * Main Resume Schema
 * Combines all individual section schemas into the top-level resume structure.
 */
export const resumeSchema = z.object({
  templateId: z.enum(["formal", "biodata"]).default("formal"), // Track the selected template
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.number().optional(), // Optional phone number
    location: z.string().min(1, "Location is required"),
    summary: z.string(), // Basic bio or professional summary text
    linkedin: z.string().optional(),
    website: z.string().optional(),

    // Biodata specific fields
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
  summary: z.string().optional(), // Overarching summary, if extracted outside personalInfo
  experience: z.array(experienceSchema).default([]),
  skills: z.array(SkillsSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  characterReferences: z.array(characterReferenceSchema).default([]),
});

/**
 * Exported TypeScript Type for the resume form values.
 * Infers the types directly from the Zod schema for type-safe forms.
 */
export type ResumeValues = z.infer<typeof resumeSchema>;