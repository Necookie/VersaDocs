import { z } from "zod";

// 1. Define the Experience Item Schema
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

// 2. Define the Main Resume Schema
// This combines all sections into one big object
export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }),
  summary: z.string().optional(),
  // We default to an empty array so the form doesn't crash on load
  experience: z.array(experienceSchema).default([]), 
});

// 3. Export the TypeScript Type
// This magic line creates the type { personalInfo: ... } automatically!
export type ResumeValues = z.infer<typeof resumeSchema>;