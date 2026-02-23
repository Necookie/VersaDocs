"use client"; // Tells Next.js: "This runs in the browser, not the server"

import { Resolver, useForm, useWatch } from "react-hook-form";
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
  BiodataInfoForm,
  CharacterReferencesForm,
} from "@/components/form";
import { RESUME_STORAGE_KEY } from "@/features/resume-editor/constants/storage";
import { createEmptyResume } from "@/lib/schemas/resume";

/**
 * Props for the main ResumeForm layout.
 */
interface ResumeFormProps {
  /**
   * Initial data block injected from the global store.
   */
  defaultData: ResumeValues;
  /**
   * Callback fired on every form update (keystrokes, field changes).
   * This pushes the live data back up to the parent page so it can be passed to the previewer.
   */
  onUpdate: (data: ResumeValues) => void;
}

/**
 * The primary form container for capturing user details.
 * Contains sub-form sections rendered inside of Accordion panels.
 * Features auto-saving via `useEffect` tracking form values.
 */
export function ResumeForm({ onUpdate, defaultData }: ResumeFormProps) {
  // 1. Setup the form using React Hook Form & Zod for schema validation
  const form = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema) as Resolver<ResumeValues>,
    defaultValues: defaultData,
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
    const empty = createEmptyResume();

    form.reset(empty);
    try {
      if (typeof window !== "undefined") localStorage.removeItem(RESUME_STORAGE_KEY);
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

          {/* BIODATA INFO SECTION */}
          <AccordionItem value="biodata-info" className="shadow-md rounded-md p-4 border-l-4 border-primary">
            <AccordionTrigger>Biodata Details</AccordionTrigger>
            <AccordionContent>
              <BiodataInfoForm form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* CHARACTER REFERENCES SECTION */}
          <AccordionItem value="character-references" className="shadow-md rounded-md p-4 border-l-4 border-primary">
            <AccordionTrigger>Character References (Biodata)</AccordionTrigger>
            <AccordionContent>
              <CharacterReferencesForm form={form} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Save Button */}
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
      </div>
    </div>
  );
}
