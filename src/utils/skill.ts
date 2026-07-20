import type { Skill } from "../types/skill";

export const createSkill = (
    id: number,
    name: string,
    category: string
): Skill => {
    return {
        id,
        name,
        category
    }
};