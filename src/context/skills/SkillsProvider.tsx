import { useReducer, useRef, type ReactNode } from "react";
import type { SkillCategory } from "../../types/skill";
import { initialSkills } from "../../data/initialSkills";
import { skillsReducer } from "../../components/sections/Skills/skillsReducer";
import { createSkill } from "../../utils/skill";
import { SkillsContext } from "./SkillsContext";

type SkillsProviderProps = {
  children: ReactNode;
};

export const SkillsProvider = ({ children }: SkillsProviderProps) => {
  const nextSkillId = useRef(initialSkills.length + 1);
  const [skills, dispatch] = useReducer(skillsReducer, initialSkills);

  const addSkill = (skillName: string) => {
    const newSkill = createSkill(nextSkillId.current++, skillName, "other");

    dispatch({
      type: "addSkill",
      skill: newSkill,
    });
  };

  const deleteSkill = (skillId: number) => {
    dispatch({
      type: "deleteSkill",
      skillId,
    });
  };

  const updateSkill = (skillId: number, skillName: string) => {
    dispatch({
      type: "updateSkill",
      skillId,
      skillName,
    });
  };

  const updateSkillCategory = (
    skillId: number,
    skillCategory: SkillCategory,
  ) => {
    dispatch({
      type: "updateSkillCategory",
      skillId,
      skillCategory,
    });
  };

  return (
    <SkillsContext.Provider
      value={{
        skills,
        addSkill,
        deleteSkill,
        updateSkill,
        updateSkillCategory,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
