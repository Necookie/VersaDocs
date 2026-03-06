"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EducationDescription } from "@/components/EducationDescription";
import { ResumeValues } from "@/lib/schemas/resume";

/**
 * Props for the EducationForm component.
 */
interface EducationFormProps {
  form: UseFormReturn<ResumeValues>;
}

/**
 * Sub-form component for managing a dynamic list of education experiences.
 * Utilizes `useFieldArray` to allow users to add, remove, and update multiple entries.
 */
export function EducationForm({ form }: EducationFormProps) {
  // 1. Setup the field array for the 'education' array in the resume schema
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div className="space-y-4">
      {/* 2. Map through each education entry saved so far */}
      {educationFields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Education {index + 1}</span>
          </div>

          {/* INSTITUTION INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Institution <span className="text-red-500">*</span>
            </label>
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

          {/* DEGREE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Degree <span className="text-red-500">*</span>
            </label>
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

          {/* FIELD OF STUDY INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Field of Study <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <Input
              {...form.register(`education.${index}.fieldOfStudy`)}
              placeholder="Computer Science"
            />
          </div>

          {/* DATE INPUTS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
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
              <label className="text-sm font-medium">
                End Date <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <Input
                {...form.register(`education.${index}.endDate`)}
                placeholder="May 2023"
              />
            </div>
          </div>

          {/* EDUCATION DESCRIPTION (Nested Field Array for Bullet Points) */}
          <EducationDescription EducationIndex={index} form={form} />

          {/* REMOVE BUTTON configuration */}
          <Button variant="outline" type="button" onClick={() => removeEducation(index)}>
            Remove Education
          </Button>
        </div>
      ))}

      {/* 3. Button to append a completely empty schema template object to education */}
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
            description: [],
          })
        }
      >
        + Add Education
      </Button>
    </div>
  );
}
