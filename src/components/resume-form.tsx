"use client"; // <--- This tells Next.js: "This runs in the browser, not the server"

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, type ResumeValues } from "@/lib/schemas/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ResumeForm() {
  // 1. Setup the form "Brain"
  // We use Zod to validate and type the form data
  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: { //default empty values
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        website: "",
        
      },
      experience: [], 
      education: [], 
    },
  });

  // 2. Watch the data (so we can see it update live!)
  // This is vital for your <500ms preview requirement later
  const formValues = form.watch();

  function onSubmit(data: ResumeValues) {
    console.log("Form Submitted:", data);
    // Later: This is where we will send data to the PDF generator
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
      
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
        </Accordion>

        {/* We will add Experience Section here next */}
        <Button onClick={form.handleSubmit(onSubmit)}>Save Resume</Button>
      </div>

      {/* RIGHT COLUMN: The "Preview" (Raw Data for now) */}
      <div className="bg-slate-950 text-slate-50 p-6 rounded-lg font-mono text-sm h-fit sticky top-8">
        <h3 className="text-xl font-bold mb-4 text-green-400">Live State Preview</h3>
        <p className="text-slate-400 mb-4">
          As you type on the left, this updates instantly. 
          This is the data we will feed into the PDF engine.
        </p>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>

    </div>
  );
}