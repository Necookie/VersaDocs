import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { resumeSchema, type ResumeValues } from "@/lib/schemas/resume";

const STORAGE_KEY = "versadocs-resume-data";

/**
 * Custom hook to manage the state of the resume form.
 * It initializes the form with React Hook Form and Zod validation,
 * loads initial data from localStorage, and syncs updates back to localStorage.
 * 
 * @param onUpdate - Callback fired whenever the form values change
 * @returns form instance and specific field arrays (experience, education, skills, projects)
 */
export function useResumeForm(onUpdate: (data: ResumeValues) => void) {
  const form = useForm<ResumeValues>({
    // @ts-expect-error: zodResolver evaluates z.input (which has optional fields due to .default) rather than z.output (ResumeValues)
    resolver: zodResolver(resumeSchema),
    defaultValues: async () => {
      // Attempt to load previously saved resume data from localStorage
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        try {
          if (saved) return JSON.parse(saved) as ResumeValues;
        } catch {
          // ignore parse errors
        }
      }
      // Return a structured empty default to satisfy React Hook Form
      return {
        templateId: "formal",
        personalInfo: {
          fullName: "", email: "", location: "", summary: "",
          age: "", dateOfBirth: "", placeOfBirth: "", civilStatus: "",
          religion: "", height: "", weight: "", citizenship: "",
          fathersName: "", fathersOccupation: "", mothersName: "", mothersOccupation: ""
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        characterReferences: [],
      } as unknown as ResumeValues;
    },
  });

  // Watch for any changes to the form state
  const formValues = useWatch({ control: form.control });

  // Sync state to local storage and trigger onUpdate callback upon changes
  useEffect(() => {
    onUpdate(formValues as ResumeValues);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
    }
  }, [formValues, onUpdate]);

  return {
    form,
    experience: useFieldArray({ control: form.control, name: "experience" }),
    education: useFieldArray({ control: form.control, name: "education" }),
    skills: useFieldArray({ control: form.control, name: "skills" }),
    projects: useFieldArray({ control: form.control, name: "projects" }),
    characterReferences: useFieldArray({ control: form.control, name: "characterReferences" }),
  };
}