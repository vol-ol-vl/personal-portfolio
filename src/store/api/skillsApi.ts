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
      invalidatesTags: ["Skills"],
    }),
    updateSkill: build.mutation<Skill, { skillId: number; skillName: string }>({
      query: ({ skillId, skillName }) => ({
        url: "/skills/" + skillId,
        method: "PATCH",
        body: { name: skillName },
      }),
      invalidatesTags: ["Skills"],
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
