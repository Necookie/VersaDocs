import { create } from 'zustand';
import { ResumeValues } from '@/lib/schemas/resume';

/**
 * Standard default empty structure matching the Zod schema for ResumeValues
 */
const defaultResumeData: ResumeValues = {
    templateId: "formal",
    personalInfo: {
        fullName: "",
        email: "",
        phone: undefined,
        location: "",
        summary: "",
        linkedin: "",
        website: "",
        age: "",
        dateOfBirth: "",
        placeOfBirth: "",
        civilStatus: "",
        religion: "",
        height: "",
        weight: "",
        citizenship: "",
        fathersName: "",
        fathersOccupation: "",
        mothersName: "",
        mothersOccupation: "",
    },
    experience: [],
    skills: [],
    education: [],
    projects: [],
    characterReferences: [],
};

/**
 * The Shape of the Zustand Store
 */
interface ResumeStore {
    // Base State Data
    resumeData: ResumeValues;

    // Actions to mutate State Data
    setResumeData: (data: ResumeValues) => void;
    resetToDefault: () => void;
}

/**
 * Global State Hook mapped to the React Component Tree.
 * Allows components like EditorPage and Navbar to directly access and mutate
 * form payloads without prop drilling.
 */
export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: defaultResumeData,

    // Completely wipe the store with a new valid structure (e.g., from DB load or continuous Hook Form syncing)
    setResumeData: (data) => set({ resumeData: data }),

    // Restore pure defaults (e.g., matching the Clear All button)
    resetToDefault: () => set({ resumeData: defaultResumeData }),
}));
