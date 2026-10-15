import { createContext, useContext, useReducer, useRef, type ReactNode } from "react";
import type { Skill, SkillCategory } from "../types/skill";
import { initialSkills } from "../data/initialSkills";
import { skillsReducer } from "../components/sections/Skills/skillsReducer";
import { createSkill } from "../utils/skill";


type SkillsContextValue = {
    skills: Skill[];
    addSkill: (skillName: string) => void;
    deleteSkill: (skillId: number) => void;
    updateSkill: (skillId: number, skillName: string) => void;
    updateSkillCategory: (skillId: number, skillCategory: SkillCategory) => void;
};

export const SkillsContext = createContext<SkillsContextValue | undefined>(undefined);

export const useSkills = () => {
    const context = useContext(SkillsContext);

    if (context === undefined) {
        throw new Error ('useSkills must be used inside SkillsProvider');
    }

    return context;
};

type SkillsProviderProps = {
    children: ReactNode;
};

export const SkillsProvider = ({children}: SkillsProviderProps) => {
      const nextSkillId = useRef(initialSkills.length + 1);
      const [skills, dispatch] = useReducer(
        skillsReducer,
        initialSkills
      );

    const addSkill = (skillName: string) => {
        const newSkill = createSkill(
        nextSkillId.current++,
        skillName,
        'other'
        );
    
        dispatch({
            type: 'addSkill',
            skill: newSkill
        });
    };

    const deleteSkill = (skillId: number) => {
        dispatch({
            type: 'deleteSkill',
            skillId
        });
    };

    const updateSkill = (skillId: number, skillName: string) => {
        dispatch({
            type: 'updateSkill',
            skillId,
            skillName
        });
    };

    const updateSkillCategory = (skillId: number, skillCategory: SkillCategory ) => {
        dispatch({
            type: 'updateSkillCategory',
            skillId,
            skillCategory
        });
    };

    return (
        <SkillsContext.Provider value={{
                skills,
                addSkill,
                deleteSkill,
                updateSkill,
                updateSkillCategory
        }}>
            {children}
        </SkillsContext.Provider>
    );
};