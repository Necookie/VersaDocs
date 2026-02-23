import { ResumeValues } from "@/lib/schemas/resume";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Props for JobDescription component.
 */
interface JobDescriptionProps {
    /** 
     * The array index of the specific job experience entry 
     */
    JobIndex: number;
    /** 
     * The `control` object from React Hook Form
     */
    control: Control<ResumeValues>;
}

/**
 * Component that manages a dynamic array of bullet points (Key Achievements) for a job entry.
 * Note: Despite the original name `Jobdescription`, it powers the `experience` array's descriptions.
 */
export function JobDescription({ JobIndex, control }: JobDescriptionProps) {
    // 1. Initialize the field array targeting the nested description array within the experience array
    const { fields: descriptionFields, append: appendDescription, remove: removeDescription } = useFieldArray({
        control,
        name: `experience.${JobIndex}.description` as never,
    })

    return (
        <main>
            <div className="mt-2 space-y-2">
                <label className="text-sm font-medium">
                    Key Achievements <span className="text-gray-400 text-xs">(Bullet points)</span>
                </label>
            </div>

            {/* 2. Map existing bullet points to input fields */}
            {descriptionFields.map((desc, descIndex) => (
                <div key={desc.id} className='flex items-center gap-2 mt-1'>
                    <Input {...control.register(`experience.${JobIndex}.description.${descIndex}` as never)} placeholder='Describe your achievement' />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDescription(descIndex)}
                        className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                    </Button>
                </div>
            ))}

            {/* 3. Button to add a new achievement point */}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 "
                onClick={() => appendDescription('')}>
                <Plus size={16} className="mr-2" />
                Add Achievement
            </Button>
        </main>
    )
}