import { UseFormReturn, useFieldArray, FieldErrors } from "react-hook-form";
import { ResumeValues } from "@/lib/schemas/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Props mapping for the Character References sub-form.
 */
interface CharacterReferencesFormProps {
    form: UseFormReturn<any>;
}

/**
 * Form to dynamically add, edit, or remove Character References, typically used
 * in standard Biodata layouts in the Philippines.
 */
export function CharacterReferencesForm({ form }: CharacterReferencesFormProps) {
    const {
        fields: referenceFields,
        append: appendReference,
        remove: removeReference,
    } = useFieldArray({
        control: form.control,
        name: "characterReferences",
    });

    const errors = form.formState.errors as FieldErrors<ResumeValues>;

    return (
        <div className="space-y-4">
            {referenceFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4 shadow-sm relative pt-8">
                    <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        type="button"
                        onClick={() => removeReference(index)}
                    >
                        Remove
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Reference Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
                            <Input {...form.register(`characterReferences.${index}.name` as const)} placeholder="e.g., Dr. Jose Rizal" />
                            {errors.characterReferences?.[index]?.name && (
                                <p className="text-red-500 text-xs">
                                    {errors.characterReferences[index]?.name?.message}
                                </p>
                            )}
                        </div>

                        {/* Reference Occupation */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Occupation <span className="text-red-500">*</span></label>
                            <Input {...form.register(`characterReferences.${index}.occupation` as const)} placeholder="e.g., Professor" />
                            {errors.characterReferences?.[index]?.occupation && (
                                <p className="text-red-500 text-xs">
                                    {errors.characterReferences[index]?.occupation?.message}
                                </p>
                            )}
                        </div>

                        {/* Reference Address */}
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <label className="text-sm font-medium">Address <span className="text-red-500">*</span></label>
                            <Input {...form.register(`characterReferences.${index}.address` as const)} placeholder="e.g., 123 University Ave, Manila" />
                            {errors.characterReferences?.[index]?.address && (
                                <p className="text-red-500 text-xs">
                                    {errors.characterReferences[index]?.address?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Add New Reference Button */}
            <Button
                type="button"
                variant="outline"
                onClick={() => appendReference({ id: crypto.randomUUID(), name: "", occupation: "", address: "" })}
                className="w-full border-dashed"
            >
                + Add Character Reference
            </Button>
        </div>
    );
}
