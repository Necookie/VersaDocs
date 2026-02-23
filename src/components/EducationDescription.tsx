import { ResumeValues } from "@/lib/schemas/resume";
import { Control, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Props for EducationDescription component.
 */
interface EducationDescriptionProps {
    /** 
     * The array index of the specific education entry this description belongs to 
     */
    EducationIndex: number;
    /** 
     * The `control` object from React Hook Form, used to manage field arrays
     */
    control: Control<ResumeValues>;
}

/**
 * Component that manages a dynamic array of bullet points (Key Points) for a specific education entry.
 * Utilizes `useFieldArray` to allow users to add or remove individual bullet points.
 */
export function EducationDescription({ EducationIndex, control }: EducationDescriptionProps) {
    // 1. Initialize the field array for the specific education's description array
    const { fields: descriptionFields, append: appendDescription, remove: removeDescription } = useFieldArray({
        control,
        // The cast to `never` handles complex nested typing within React Hook Form
        name: `education.${EducationIndex}.description` as never,
    });

    return (
        <main>
            <div className="mt-2 space-y-2">
                <label className="text-sm font-medium">
                    Key Points <span className="text-gray-400 text-xs">(Bullet points)</span>
                </label>
            </div>

            {/* 2. Map through the current bullet points and render input fields */}
            {descriptionFields.map((desc, descIndex) => (
                <div key={desc.id} className='flex items-center gap-2 mt-1'>
                    <Input {...control.register(`education.${EducationIndex}.description.${descIndex}` as never)} placeholder='Describe this point' />

                    {/* Delete button for removing a specific bullet point */}
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

            {/* 3. Button to append a new empty string to the description array */}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendDescription('')}>
                <Plus size={16} className="mr-2" />
                Add Point
            </Button>
        </main>
    )
}
