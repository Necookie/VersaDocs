import { UseFormReturn } from "react-hook-form";
import { ResumeValues } from "@/lib/schemas/resume";
import { Input } from "@/components/ui/input";

/**
 * Props for the Biodata Information form sub-section.
 */
interface BiodataInfoFormProps {
    form: UseFormReturn<ResumeValues>;
}

/**
 * Sub-form rendering specific personal data fields required for the Filipino Biodata template.
 * Fields include Age, Date of Birth, Place of Birth, Religion, Civil Status, etc.
 */
export function BiodataInfoForm({ form }: BiodataInfoFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input {...form.register("personalInfo.age")} placeholder="e.g., 25" />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <Input {...form.register("personalInfo.dateOfBirth")} placeholder="e.g., January 1, 2000" />
            </div>

            {/* Place of Birth */}
            <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Place of Birth</label>
                <Input {...form.register("personalInfo.placeOfBirth")} placeholder="e.g., Manila, Philippines" />
            </div>

            {/* Civil Status */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Civil Status</label>
                <Input {...form.register("personalInfo.civilStatus")} placeholder="e.g., Single" />
            </div>

            {/* Religion */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Religion</label>
                <Input {...form.register("personalInfo.religion")} placeholder="e.g., Catholic" />
            </div>

            {/* Height */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Height</label>
                <Input {...form.register("personalInfo.height")} placeholder="e.g., 5'7&quot;" />
            </div>

            {/* Weight */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Weight</label>
                <Input {...form.register("personalInfo.weight")} placeholder="e.g., 150 lbs" />
            </div>

            {/* Citizenship */}
            <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Citizenship</label>
                <Input {...form.register("personalInfo.citizenship")} placeholder="e.g., Filipino" />
            </div>

            {/* Father's Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Father&apos;s Name</label>
                <Input {...form.register("personalInfo.fathersName")} placeholder="e.g., Juan Dela Cruz Sr." />
            </div>

            {/* Father's Occupation */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Father&apos;s Occupation</label>
                <Input {...form.register("personalInfo.fathersOccupation")} placeholder="e.g., Engineer" />
            </div>

            {/* Mother's Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Mother&apos;s Name</label>
                <Input {...form.register("personalInfo.mothersName")} placeholder="e.g., Maria Dela Cruz" />
            </div>

            {/* Mother's Occupation */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Mother&apos;s Occupation</label>
                <Input {...form.register("personalInfo.mothersOccupation")} placeholder="e.g., Teacher" />
            </div>
        </div>
    );
}
