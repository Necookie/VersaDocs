"use client"; // Tells Next.js: "This runs in the browser, not the server"

import { Resolver, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, type ResumeValues } from "@/lib/schemas/resume";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

        {/* Fillable Form Sections inside Tabs */}
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 p-2 justify-start mb-4 bg-muted/50 rounded-lg">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="biodata-info">Biodata Details</TabsTrigger>
            <TabsTrigger value="character-references">References</TabsTrigger>
          </TabsList>

          {/* PERSONAL INFO SECTION */}
          <TabsContent value="personal-info" className="shadow-md rounded-md p-4 bg-card border">
            <PersonalInfoForm form={form} />
          </TabsContent>

          {/* EXPERIENCE SECTION */}
          <TabsContent value="experience" className="shadow-md rounded-md p-4 bg-card border">
            <ExperienceForm form={form} />
          </TabsContent>

          {/* SKILLS SECTION */}
          <TabsContent value="skills" className="shadow-md rounded-md p-4 bg-card border">
            <SkillsForm form={form} />
          </TabsContent>

          {/* EDUCATION SECTION */}
          <TabsContent value="education" className="shadow-md rounded-md p-4 bg-card border">
            <EducationForm form={form} />
          </TabsContent>

          {/* PROJECTS SECTION */}
          <TabsContent value="projects" className="shadow-md rounded-md p-4 bg-card border">
            <ProjectsForm form={form} />
          </TabsContent>

          {/* BIODATA INFO SECTION */}
          <TabsContent value="biodata-info" className="shadow-md rounded-md p-4 border-l-4 border-primary bg-card">
            <BiodataInfoForm form={form} />
          </TabsContent>

          {/* CHARACTER REFERENCES SECTION */}
          <TabsContent value="character-references" className="shadow-md rounded-md p-4 border-l-4 border-primary bg-card">
            <CharacterReferencesForm form={form} />
          </TabsContent>

        </Tabs>

        {/* Save Button */}
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
      </div>
    </div>
  );
}
