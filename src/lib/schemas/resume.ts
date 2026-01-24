import { z } from "zod";

//Experiences Schema 
// This handles the complex logic for job entries
const experienceSchema = z.object({
  id: z.string(), // Unique ID for React keys
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(), // The final narrative
  
  // AI Specific fields
  rawInput: z.string().optional(), // What user typed ("I fixed bugs")
  isGenerating: z.boolean().default(false), // Loading state
});

//Education Schema
const educationSchema = z.object({
    id: z.string(),
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string().optional(),
})

// 2. Define the Main Resume Schema
// This combines all sections into one big object
export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }),
  summary: z.string().optional(),
  // default to empty array for both experience and education
  experience: z.array(experienceSchema).default([]), 
  education: z.array(educationSchema).default([]),
});

// 3. Export the TypeScript Type
// This magic line creates the type { personalInfo: ... } automatically!
export type ResumeValues = z.infer<typeof resumeSchema>;