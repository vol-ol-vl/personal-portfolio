import { useCallback, useMemo, useState, type ChangeEvent } from "react";

import type { Skill, SkillCategory, SkillFilter, SortOrder } from "../../../types/skill";
import { normalizeText } from "../../../utils/text";

import SkillItem from "./SkillItem";
import SkillFilters from "./SkillFilters";
import AddSkillForm from "./AddSkillForm";

import './Skills.css';

type SkillsProps = {
    skills: Skill[],
    onAddSkill: (skillName: string) => void,
    onDeleteSkill: (skillId: number) => void,
    onUpdateSkill: (skillId: number, skillName: string) => void,
    onUpdateSkillCategory: (skillId: number, skillCategory: SkillCategory) => void
}

const Skills = ({
        skills, 
        onAddSkill, 
        onDeleteSkill,
        onUpdateSkill,
        onUpdateSkillCategory,
    }: SkillsProps) => {

    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<SkillFilter>('all');
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    
    const filteredSkills = useMemo(() => {
        const normalizedSearch = normalizeText(search);

        return skills.filter(skill => {            
            const matchesSearch = normalizeText(skill.name).includes(normalizedSearch);
            const matchesCategory = category === 'all' || skill.category === category;
            return matchesSearch && matchesCategory;
        })
    }, [
            skills,
            search,
            category
        ]
    );
    
    const sortedByNameSkills = useMemo(() => {
            return [...filteredSkills].sort(
                (skillA, skillB) => {
                    const comparison = normalizeText(
                            skillA.name
                    ).localeCompare(
                        normalizeText(skillB.name)
                    );

                    return sortOrder === 'asc'
                        ? comparison
                        : -comparison;
                }
            );
        },[
            filteredSkills,
            sortOrder
        ]
    );

    const isValidSkillName = useCallback((
            skillName: string,
            skillId?: number
    ): boolean => {
        const normalizedSkillName = normalizeText(skillName);

        if (normalizedSkillName.length === 0) {
            return false;
        }

        const isDuplicate = skills.some(skill =>
            skill.id !== skillId &&
            normalizeText(skill.name) === normalizedSkillName
        );

        return !isDuplicate;
    }, [skills]);

    const buttonText = isVisible ? 'Скрыть навыки' : 'Показать навыки';

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };
    const handleToggleVisibility = () => {
        setIsVisible(isVisible => !isVisible);
    };

    const handleAddSkill = useCallback((skillName: string): boolean => {
        if (!isValidSkillName(skillName)) {
            return false;
        }

        onAddSkill(skillName.trim());
        return true;
    }, [isValidSkillName, onAddSkill]);
  
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as SkillFilter);
    };

    const handleUpdateSkill = useCallback((
        skillId: number,
        skillName: string
    ): boolean => {
        if (!isValidSkillName(skillName, skillId)) {
            return false;
        }

        onUpdateSkill(skillId, skillName.trim());
        
        return true;
    }, [isValidSkillName, onUpdateSkill]);

    const handleSortOrderChange = () => {
        setSortOrder(previousSortOrder =>
            previousSortOrder === 'asc'
                ? 'desc'
                : 'asc'
        );
    };

    return (
        <section className="skills">
            <div className="container">
                <h2 className="skills__title">Навыки</h2>

                <SkillFilters
                    search={search}
                    category={category}
                    sortOrder={sortOrder}
                    onSearchChange={handleSearchChange}
                    onCategoryChange={handleCategoryChange}
                    onSortOrderChange={handleSortOrderChange}
                />
                
                { isVisible && (
                    sortedByNameSkills.length > 0 
                    ? <ul className="skills__list">
                            { sortedByNameSkills.map(skill  => (
                                <SkillItem
                                    skill={skill}
                                    key={skill.id}
                                    onDeleteSkill={onDeleteSkill}
                                    onUpdateSkill={handleUpdateSkill}
                                    onUpdateSkillCategory={onUpdateSkillCategory}
                                />
                                )
                            )}
                        </ul>
                        : <p className="skills__empty">Ничего не найдено</p>
                )}

                <button
                    className="skills__toggle"
                    onClick={handleToggleVisibility}
                >
                    {buttonText}
                </button>

                <AddSkillForm
                    onAddSkill={handleAddSkill} 
                />
            </div>
        </section>
    );
}

export default Skills;