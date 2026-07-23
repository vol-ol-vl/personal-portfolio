import type { Skill, SkillCategory } from "../types/skill";

export const createSkill = (
    id: number,
    name: string,
    category: SkillCategory
): Skill => {
    return {
        id,
        name,
        category
    }
};