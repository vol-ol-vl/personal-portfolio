import { createSlice } from "@reduxjs/toolkit";
import { initialSkills } from "../data/initialSkills";
import type { PayloadAction } from "@reduxjs/toolkit";

const skillsSlice = createSlice({
    name: 'skills',
    initialState: initialSkills,
    reducers: {
        deleteSkill(state, action: PayloadAction<{id: number}>) {
            return state.filter(skill => skill.id !== action.payload.id);
        },
    }
});

export const { deleteSkill } = skillsSlice.actions;
export default skillsSlice.reducer;