"use client"; // Tells Next.js: "This runs in the browser, not the server"

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, type ResumeValues } from "@/lib/schemas/resume";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";
import {
  PersonalInfoForm,
  ExperienceForm,
  SkillsForm,
  EducationForm,
  ProjectsForm,
} from "@/components/form";

const STORAGE_KEY = "versadocs-resume-data";

/**
 * Props for the main ResumeForm layout.
 */
interface ResumeFormProps {
  /**
   * Callback fired on every form update (keystrokes, field changes).
   * This pushes the live data back up to the parent page so it can be passed to the previewer.
   */
  onUpdate: (data: ResumeValues) => void;
}

/**
 * Helper function to instantiate default or locally cached resume form values.
 * Parses the data securely, falling back to a clean empty schema if parsing fails.
 */
function getInitialValues(): ResumeValues {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
  }
  // Default empty values corresponding to the zod schema layout
  return {
    personalInfo: {
      fullName: "",
      email: "",
      phone: undefined,
      location: "",
      summary: "",
      linkedin: "",
      website: "",
    },
    experience: [],
    skills: [],
    education: [],
    projects: [],
  };
}

/**
 * The primary form container for capturing user details.
 * Contains sub-form sections rendered inside of Accordion panels.
 * Features auto-saving via `useEffect` tracking form values.
 */
export function ResumeForm({ onUpdate }: ResumeFormProps) {
  // 1. Setup the form using React Hook Form & Zod for schema validation
  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: getInitialValues(),
  });

  // 2. Watch the data to get live updates
  // This live state powers the <500ms preview reload
  const formValues = useWatch({
    control: form.control,
  });

  // Sync state upward to the Editor Page component every time the watched form variables change.
  useEffect(() => {
    if (onUpdate) {
      onUpdate(formValues as ResumeValues);
    }
  }, [formValues, onUpdate]);

  /**
   * Handler for explicit save clicks
   */
  function onSubmit(data: ResumeValues) {
    console.log("Form Submitted:", data);
    onUpdate(data);
  }

  /**
   * Resets the entire form schema and clears local storage caches.
   */
  function clearAll() {
    const empty: ResumeValues = {
      personalInfo: {
        fullName: "",
        email: "",
        phone: undefined,
        location: "",
        summary: "",
        linkedin: "",
        website: "",
      },
      experience: [],
      skills: [],
      education: [],
      projects: [],
    };

    form.reset(empty);
    try {
      if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear storage", e);
    }
    if (onUpdate) onUpdate(empty);
  }

  return (
    <div className="w-full">
      {/* LEFT COLUMN: The Editor Panels */}
      <div className="space-y-6">
        {/* Action Toolbar */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={clearAll} className="mr-2">
            Clear All
          </Button>
        </div>

        {/* Fillable Form Sections inside Accordions */}
        <Accordion type="multiple" defaultValue={["personal-info"]}>

          {/* PERSONAL INFO SECTION */}
          <AccordionItem value="personal-info" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Personal Info</AccordionTrigger>
            <AccordionContent>
              <PersonalInfoForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* EXPERIENCE SECTION */}
          <AccordionItem value="experience" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Experience</AccordionTrigger>
            <AccordionContent>
              <ExperienceForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* SKILLS SECTION */}
          <AccordionItem value="skills" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Skills</AccordionTrigger>
            <AccordionContent>
              <SkillsForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* EDUCATION SECTION */}
          <AccordionItem value="education" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent>
              <EducationForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* PROJECTS SECTION */}
          <AccordionItem value="projects" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Projects</AccordionTrigger>
            <AccordionContent>
              <ProjectsForm form={form} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Save Button */}
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
      </div>
    </div>
  );
}