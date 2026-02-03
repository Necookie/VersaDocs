"use client"; // <--- This tells Next.js: "This runs in the browser, not the server"

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

interface ResumeFormProps {
  // onUpdate function prop to update whenever the form data changes and returns void after updating
    onUpdate: (data: ResumeValues) => void;
}

function getInitialValues(): ResumeValues {
  // if window is in the browser get data from local storage and if there is data parse it and return it else if window is not in the browser return undefined
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
    // Default empty values of the zod schema
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

export function ResumeForm({ onUpdate }: ResumeFormProps) {
  // 1. Setup the form 
  // We use Zod to validate and type the form data
  const form = useForm({
    //resolver to connect the schema to the form and handles validation
    resolver: zodResolver(resumeSchema),
    defaultValues: getInitialValues(),
  });

  // 2. Watch the data (so we can see it update live!)
  // This is vital for your <500ms preview requirement later
  const formValues = useWatch({
    control: form.control,
  });
 //useEffect to update the form values everytime there is a change in the form values
  useEffect(() => {
    if (onUpdate) {
      onUpdate(formValues as ResumeValues); // Notify parent of changes
    }
  }, [formValues, onUpdate]);

  function onSubmit(data: ResumeValues) {
    console.log("Form Submitted:", data);
    // Later: This is where we will send data to the PDF generator
    onUpdate(data);
  }

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
      
      {/* LEFT COLUMN: The Editor */}
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={clearAll} className="mr-2">
            Clear All
          </Button>
        </div>
        <Accordion type="multiple"  defaultValue={["personal-info"]}>
          <AccordionItem value="personal-info" className="shadow-md rounded-md p-4">
            <AccordionTrigger >Personal Info</AccordionTrigger>
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
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
        
      </div>
    </div>
  );
}