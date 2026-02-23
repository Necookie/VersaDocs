import { create } from "zustand";
import { createEmptyResume, ResumeValues } from "@/features/resume-editor/schema/resume";

interface ResumeStore {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  resetToDefault: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: createEmptyResume(),
  setResumeData: (data) => set({ resumeData: data }),
  resetToDefault: () => set({ resumeData: createEmptyResume() }),
}));
