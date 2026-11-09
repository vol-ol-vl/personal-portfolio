import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Skill, SkillCategory } from "../../types/skill";

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  keepUnusedDataFor: 60,
  tagTypes: ["Skills"],
  endpoints: (build) => ({
    getSkills: build.query<Skill[], void>({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),
    addSkill: build.mutation<Skill, Omit<Skill, "id">>({
      query: (newSkill) => ({
        url: "/skills",
        method: "POST",
        body: newSkill,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: build.mutation<void, number>({
      query: (skillId) => ({
        url: "/skills/" + skillId,
        method: "DELETE",
      }),
      async onQueryStarted(skillId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          skillsApi.util.updateQueryData("getSkills", undefined, (draft) => {
            return draft.filter((item) => item.id !== skillId);
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Произошла ошибка " + error);
          patchResult.undo();
        }
      },
    }),
    updateSkill: build.mutation<Skill, { skillId: number; skillName: string }>({
      query: ({ skillId, skillName }) => ({
        url: "/skills/" + skillId,
        method: "PATCH",
        body: { name: skillName },
      }),
      async onQueryStarted(
        { skillId, skillName },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          skillsApi.util.updateQueryData("getSkills", undefined, (draft) => {
            const skill = draft.find((item) => item.id === skillId);

            if (skill) {
              skill.name = skillName;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Произошла ошибка при изменении навыка" + error);
        }
      },
    }),
    updateSkillCategory: build.mutation<
      Skill,
      { skillId: number; skillCategory: SkillCategory }
    >({
      query: ({ skillId, skillCategory }) => ({
        url: "/skills/" + skillId,
        method: "PATCH",
        body: { category: skillCategory },
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useUpdateSkillCategoryMutation,
} = skillsApi;
