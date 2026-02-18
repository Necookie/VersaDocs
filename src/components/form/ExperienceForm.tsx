"use client";

import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobDescription } from "@/components/Jobdescription";

interface ExperienceFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}
// Experience Form Component
export function ExperienceForm({ form }: ExperienceFormProps) {
  const {fields: experienceFields, append: appendExperience, remove: removeExperience, } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  return (
    <div className="space-y-4">
      {experienceFields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Experience {index + 1}</span>
          </div>

          {/* COMPANY INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Company <span className="text-red-500">*</span>
            </label>
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

          {/* ROLE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Role <span className="text-red-500">*</span>
            </label>
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

          {/* DATE INPUTS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
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
              <label className="text-sm font-medium">
                End Date <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <Input
                {...form.register(`experience.${index}.endDate`)}
                placeholder="Present"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Currently Working Here: </label>
              <input
                type="checkbox"
                {...form.register(`experience.${index}.current`)}
                className="h-3 w-5 text-indigo-600 rounded border-gray-300"
              />
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="space-y-2">
            <JobDescription JobIndex={index} control={form.control as never} />
            <Button
              variant="outline"
              type="button"
              onClick={() => removeExperience(index)}
              className="mt-2"
            >
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
            description: [],
            rawInput: "",
            isGenerating: false,
          })
        }
      >
        + Add Experience
      </Button>
    </div>
  );
}
