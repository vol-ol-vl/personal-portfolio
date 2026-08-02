export type SkillCategory = 'language' | 'other';
export type SortOrder = 'asc' | 'desc';

export type SkillFilter = 'all' | SkillCategory;

export type Skill = {
    id: number;
    name: string;
    category: SkillCategory;
};
