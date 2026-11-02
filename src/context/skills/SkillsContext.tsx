import { createContext, useContext } from "react";
import type { Skill, SkillCategory } from "../../types/skill";

type SkillsContextValue = {
  skills: Skill[];
  addSkill: (skillName: string) => void;
  deleteSkill: (skillId: number) => void;
  updateSkill: (skillId: number, skillName: string) => void;
  updateSkillCategory: (skillId: number, skillCategory: SkillCategory) => void;
};

export const SkillsContext = createContext<SkillsContextValue | undefined>(
  undefined,
);

export const useSkills = () => {
  const context = useContext(SkillsContext);

  if (context === undefined) {
    throw new Error("useSkills must be used inside SkillsProvider");
  }

  return context;
};
