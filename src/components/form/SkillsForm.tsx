"use client";

import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Props for the SkillsForm component.
 */
interface SkillsFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any; // Standard React Hook Form control instance
}

/**
 * Sub-form component for managing a dynamic list of skills.
 * Leverages `useFieldArray` to allow users to add and manage distinct skill entries.
 */
export function SkillsForm({ form }: SkillsFormProps) {
  // 1. Setup the field array targeting 'skills' in the schema schema
  const {
    fields: skillsFields,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  return (
    <div className="space-y-4">
      {/* 2. Map through existing skill entries to generate form blocks */}
      {skillsFields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Skill {index + 1}</span>
            <div>
              <Input
                {...form.register(`skills.${index}.skills`)}
                placeholder="e.g. JavaScript, React, Node.js"
              />
            </div>
            {/* Delete button specific to this skill block */}
            <Button variant="outline" type="button" onClick={() => removeSkills(index)}>
              Remove Skill
            </Button>
          </div>
        </div>
      ))}

      {/* 3. Button to append a completely empty schema wrapper representing a new skill */}
      <Button type="button" variant="outline" onClick={() => appendSkills({ skills: [] })}>
        + Add Skill
      </Button>
    </div>
  );
}
