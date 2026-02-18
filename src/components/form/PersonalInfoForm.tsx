"use client";

import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}
// Personal Info Form Component
export function PersonalInfoForm({ form }: PersonalInfoFormProps) {
  return (
    <div className="space-y-4">
      {/* FULL NAME INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input {...form.register("personalInfo.fullName")} placeholder="John Doe" />
        {form.formState.errors.personalInfo?.fullName && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.fullName.message}
          </p>
        )}
      </div>

      {/* EMAIL INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <Input {...form.register("personalInfo.email")} placeholder="john@example.com" />
        {form.formState.errors.personalInfo?.email && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.email.message}
          </p>
        )}
      </div>

      {/* PHONE INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Phone <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <Input {...form.register("personalInfo.phone")} placeholder="(123) 456-7890" />
        {form.formState.errors.personalInfo?.phone && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.phone.message}
          </p>
        )}
      </div>

      {/* LOCATION INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Location <span className="text-red-500">*</span>
        </label>
        <Input {...form.register("personalInfo.location")} placeholder="City, State, Country" />
        {form.formState.errors.personalInfo?.location && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.location.message}
          </p>
        )}
      </div>

      {/* SUMMARY INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Summary <span className="text-red-500">*</span>
        </label>
        <Input
          {...form.register("personalInfo.summary")}
          placeholder="A brief summary about what you do"
        />
        {form.formState.errors.personalInfo?.summary && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.summary.message}
          </p>
        )}
      </div>

      {/* LINKEDIN INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Linkedin <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <Input
          {...form.register("personalInfo.linkedin")}
          placeholder="linkedin.com/in/username"
        />
        {form.formState.errors.personalInfo?.linkedin && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.linkedin.message}
          </p>
        )}
      </div>

      {/* WEBSITE INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Website <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <Input
          {...form.register("personalInfo.website")}
          placeholder="https://example.com"
        />
        {form.formState.errors.personalInfo?.website && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.personalInfo?.website.message}
          </p>
        )}
      </div>
    </div>
  );
}
