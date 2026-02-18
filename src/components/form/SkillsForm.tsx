"use client";

import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SkillsFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

export function SkillsForm({ form }: SkillsFormProps) {
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
            <Button variant="outline" type="button" onClick={() => removeSkills(index)}>
              Remove Skill
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={() => appendSkills({ skills: [] })}>
        + Add Skill
      </Button>
    </div>
  );
}
