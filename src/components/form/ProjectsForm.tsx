"use client";

import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectDescription } from "@/components/ProjectDescription";

interface ProjectsFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

export function ProjectsForm({ form }: ProjectsFormProps) {
  const {fields: projectFields, append: appendProject, remove: removeProject, } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <div className="space-y-4">
      {projectFields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Project {index + 1}</span>
          </div>

          {/* PROJECT TITLE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Project Title <span className="text-red-500">*</span>
            </label>
            <Input {...form.register(`projects.${index}.title`)} placeholder="Project title" />
            {form.formState.errors.projects?.[index]?.title && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.projects[index]?.title?.message}
              </p>
            )}
          </div>

          {/* ROLE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Role <span className="text-red-500">*</span>
            </label>
            <Input {...form.register(`projects.${index}.role`)} placeholder="Your role" />
            {form.formState.errors.projects?.[index]?.role && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.projects[index]?.role?.message}
              </p>
            )}
          </div>

          {/* START DATE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Start Date <span className="text-red-500">*</span>
            </label>
            <Input {...form.register(`projects.${index}.startDate`)} placeholder="Jan 2024" />
            {form.formState.errors.projects?.[index]?.startDate && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.projects[index]?.startDate?.message}
              </p>
            )}
          </div>

          {/* PROJECT DESCRIPTION */}
          <ProjectDescription ProjectIndex={index} control={form.control as never} />

          <Button variant="outline" type="button" onClick={() => removeProject(index)}>
            Remove Project
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          appendProject({
            id: crypto.randomUUID(),
            title: "",
            role: "",
            startDate: "",
            description: [],
          })
        }
      >
        + Add Project
      </Button>
    </div>
  );
}
