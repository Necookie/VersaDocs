import { z } from "zod";

//Experiences Schema 
// This handles the complex logic for job entries
const experienceSchema = z.object({
  id: z.string(), // Unique ID for React keys
  //1 for 1 character and the "" for the error message
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.array(z.string()), // The final narrative
  // AI Specific fields
  rawInput: z.string().optional(), // What user typed ("I fixed bugs")
  isGenerating: z.boolean().default(false), // Loading state
});

//Skills schema
const SkillsSchema = z.object({
  skills: z.array(z.string()).max(10, "You can add up to 10 skills"),
})

//Education Schema
const educationSchema = z.object({
    id: z.string(),
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.array(z.string()).default([]),
})

// 2. Define the Main Resume Schema
// This combines all sections into one big object
// Projects Schema
const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  description: z.array(z.string()).default([]),
});

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    summary: z.string(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }),
  summary: z.string().optional(),
  // default to empty array for both experience and education
  experience: z.array(experienceSchema).default([]), 
  skills: z.array(SkillsSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),

});

// 3. Export the TypeScript Type
// type resumeValues to get the types from the schema and z.infer to get the output value thats going to be there

export type ResumeValues = z.infer<typeof resumeSchema>;