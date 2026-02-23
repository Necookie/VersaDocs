import { Resolver, useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createEmptyResume, hydrateResumeData, resumeSchema, type ResumeValues } from "@/lib/schemas/resume";
import { RESUME_STORAGE_KEY } from "@/features/resume-editor/constants/storage";

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
    resolver: zodResolver(resumeSchema) as Resolver<ResumeValues>,
    defaultValues: async () => {
      // Attempt to load previously saved resume data from localStorage
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(RESUME_STORAGE_KEY);
        try {
          if (saved) return hydrateResumeData(JSON.parse(saved));
        } catch {
          // ignore parse errors
        }
      }
      return createEmptyResume();
    },
  });

  // Watch for any changes to the form state
  const formValues = useWatch({ control: form.control });

  // Sync state to local storage and trigger onUpdate callback upon changes
  useEffect(() => {
    onUpdate(formValues as ResumeValues);
    if (typeof window !== "undefined") {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(formValues));
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
