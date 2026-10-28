import { createSlice } from "@reduxjs/toolkit";
import { initialSkills } from "../data/initialSkills";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Skill, SkillCategory } from "../types/skill";

const skillsSlice = createSlice({
    name: 'skills',
    initialState: initialSkills,
    reducers: {
        addSkill(state, action: PayloadAction<Skill>) {
            state.push(action.payload);
        },
        deleteSkill(state, action: PayloadAction<{skillId: number}>) {
            return state.filter(skill => skill.id !== action.payload.skillId);
        },
        updateSkill(state, action: PayloadAction<{skillId: number, skillName: string}>) {
            return state.map(skill => {
                return skill.id === action.payload.skillId
                    ? {...skill, name: action.payload.skillName}
                    : skill;
            });
        },
        updateSkillCategory(state, action: PayloadAction<{skillId: number, skillCategory: SkillCategory}>) {
            const skill = state.find(skill => skill.id === action.payload.skillId);

            if (skill) {
                skill.category = action.payload.skillCategory;
            }
        }
    }
});

export const { 
        addSkill,
        deleteSkill, 
        updateSkill, 
        updateSkillCategory 
    } = skillsSlice.actions;
export default skillsSlice.reducer;