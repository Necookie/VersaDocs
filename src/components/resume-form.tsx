"use client"; // <--- This tells Next.js: "This runs in the browser, not the server"

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, type ResumeValues } from "@/lib/schemas/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const STORAGE_KEY = "versadocs-resume-data";

interface ResumeFormProps {
    onUpdate: (data: ResumeValues) => void;
}

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
    return {
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
        },
        experience: [],
        education: [],
    };
}

export function ResumeForm({ onUpdate }: ResumeFormProps) {
  // 1. Setup the form "Brain"
  // We use Zod to validate and type the form data
  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: getInitialValues(),
  });

  // Setup useFieldArray for dynamic education entries
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience} = useFieldArray({
    control: form.control,
    name: "experience",
  })


  // 2. Watch the data (so we can see it update live!)
  // This is vital for your <500ms preview requirement later
  const formValues = useWatch({
    control: form.control,
  });

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

  return (
    <div className="w-full">
      
      {/* LEFT COLUMN: The Editor */}
      <div className="space-y-6">
        <Accordion type="multiple"  defaultValue={["personal-info"]}>
          <AccordionItem value="personal-info" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Personal Info</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {/* FULL NAME INPUT */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                {...form.register("personalInfo.fullName")} 
                placeholder="John Doe" 
                />
              {/* Error Message: Shows up if Zod validation fails */}
              {form.formState.errors.personalInfo?.fullName && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.fullName.message}
                </p>
              )}
            </div>
            {/* EMAIL INPUT */}
            <div className="space-y-s">
              <label className="text-sm font-medium">Email</label>
              <Input 
                {...form.register("personalInfo.email")} 
                placeholder="john@example.com" 
                />
              {form.formState.errors.personalInfo?.email && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input {...form.register("personalInfo.phone")} placeholder="(123) 456-7890" />
              {form.formState.errors.personalInfo?.phone && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input {...form.register("personalInfo.location")} placeholder="City, State, Country" />
              {form.formState.errors.personalInfo?.location && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Linkedin</label>
              <Input {...form.register("personalInfo.linkedin")} placeholder="linkedin.com/in/username" />
              {form.formState.errors.personalInfo?.linkedin && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.linkedin.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input {...form.register("personalInfo.website")} placeholder="https://example.com" />
              {form.formState.errors.personalInfo?.website && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.personalInfo?.website.message}
                </p>
              )}
            </div>

          </AccordionContent>
          </AccordionItem>

          {/* EDUCATION SECTION */}
          <AccordionItem value="education" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {educationFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Education {index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Institution</label>
                    <Input
                      {...form.register(`education.${index}.institution`)}
                      placeholder="University name"
                    />
                    {form.formState.errors.education?.[index]?.institution && (
                      <p className="text-red-500 text-xs">
                        {form.formState.errors.education[index]?.institution?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Degree</label>
                    <Input
                      {...form.register(`education.${index}.degree`)}
                      placeholder="Bachelor's, Master's, etc."
                    />
                    {form.formState.errors.education?.[index]?.degree && (
                      <p className="text-red-500 text-xs">
                        {form.formState.errors.education[index]?.degree?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <Input
                      {...form.register(`education.${index}.fieldOfStudy`)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        {...form.register(`education.${index}.startDate`)}
                        placeholder="Sep 2019"
                      />
                      {form.formState.errors.education?.[index]?.startDate && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.education[index]?.startDate?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        {...form.register(`education.${index}.endDate`)}
                        placeholder="May 2023"
                      />
                    </div>
                  </div>
                  <Button variant="outline" type="button" onClick={() => removeEducation(index)}>
                    Remove Education
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendEducation({
                    id: crypto.randomUUID(),
                    institution: "",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                  })
                }
              >
                + Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* EXPERIENCE SECTION */}
          <AccordionItem value="experience" className="shadow-md rounded-md p-4">
            <AccordionTrigger>Experience</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {experienceFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Experience {index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      {...form.register(`experience.${index}.company`)}
                      placeholder="Company name"
                    />
                    {form.formState.errors.experience?.[index]?.company && (
                      <p className="text-red-500 text-xs">
                        {form.formState.errors.experience[index]?.company?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Input
                      {...form.register(`experience.${index}.role`)}
                      placeholder="Software Engineer"
                    />
                    {form.formState.errors.experience?.[index]?.role && (
                      <p className="text-red-500 text-xs">
                        {form.formState.errors.experience[index]?.role?.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        {...form.register(`experience.${index}.startDate`)}
                        placeholder="Jan 2023"
                      />
                      {form.formState.errors.experience?.[index]?.startDate && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.experience[index]?.startDate?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        {...form.register(`experience.${index}.endDate`)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      {...form.register(`experience.${index}.description`)}
                      placeholder="What did you accomplish?"
                    />
                    <Button variant="outline" type="button" onClick={() => removeExperience(index)}>
                    Remove Experience
                  </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendExperience({
                    id: crypto.randomUUID(),
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                    rawInput: "",
                    isGenerating: false,
                  })
                }
              >
                + Add Experience
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
      </div>
    </div>
  );
}