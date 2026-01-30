import { ResumeValues } from "@/lib/schemas/resume";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



interface JobDescriptionProps {
    JobIndex: number;
    control: Control<ResumeValues>;
}


export function JobDescription ({ JobIndex, control}: JobDescriptionProps) {
    const { fields: descriptionFields, append: appendDescription, remove: removeDescription} = useFieldArray({
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
            {descriptionFields.map((desc, descIndex) => (
                <div key= {desc.id} className='flex items-center gap-2 mt-1'>
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