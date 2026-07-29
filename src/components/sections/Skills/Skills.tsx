import { useState, type ChangeEvent } from "react";

import type { Skill, SkillFilter } from "../../../types/skill";
import { normalizeText } from "../../../utils/text";

import SkillItem from "./SkillItem";
import './Skills.css';

type SkillsProps = {
    skills: Skill[],
    onAddSkill: (skillName: string) => void,
    onDeleteSkill: (skillId: number) => void,
    onUpdateSkill: (skillId: number, skillName: string) => void
}

const Skills = ({
        skills, 
        onAddSkill, 
        onDeleteSkill,
        onUpdateSkill
    }: SkillsProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [newSkill, setNewSkill] = useState('');

    const [category, setCategory] = useState<SkillFilter>('all');

    const normalizedSearch = normalizeText(search);
    const filteredSkills = skills.filter(skill => {
        const matchesSearch = normalizeText(skill.name).includes(normalizedSearch);
        const matchesCategory = category === 'all' || skill.category === category;
        return matchesSearch && matchesCategory;
    });
    const sortedByNameSkills = [...filteredSkills].sort((skillA, skillB) => normalizeText(skillA.name).localeCompare(normalizeText(skillB.name)));

    const buttonText = isVisible ? 'Скрыть навыки' : 'Показать навыки';

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };
    const handleToggleVisibility = () => {
        setIsVisible(isVisible => !isVisible);
    };
    const handleNewSkillChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewSkill(event.currentTarget.value);
    };
    const handleAddSkillClick = () => {
        const normalizedNewSkill = normalizeText(newSkill);
        if (normalizedNewSkill.length && !skills.some(skill => normalizeText(skill.name) === normalizedNewSkill)) {
            onAddSkill(newSkill.trim());
            setNewSkill('');
        }
    };    
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as SkillFilter);
    };
    const handleUpdateSkill = (
        skillId: number,
        skillName: string
    ) : boolean => {
        const normalizedSkillName = normalizeText(skillName);

        const isDuplicate = skills.some(
            skill =>
                skill.id !== skillId &&
                normalizeText(skill.name) === normalizedSkillName
        );

        if (normalizedSkillName.length === 0 || isDuplicate) {
            return false;
        }

        onUpdateSkill(skillId, skillName.trim());
        
        return true;
    };

    return (
        <section className="skills">
            <div className="container">
                <h2 className="skills__title">Навыки</h2>
                
                <div className="skills__filters">
                    <input
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value='all'>Все</option>
                        <option value='language'>Языки программирования</option>
                        <option value='other'>Другие</option>  
                    </select>
                </div>
                
                { isVisible && (
                    sortedByNameSkills.length > 0 
                    ? <ul className="skills__list">
                            { sortedByNameSkills.map(skill  => (
                                <SkillItem
                                    skill={skill}
                                    key={skill.id}
                                    onDeleteSkill={onDeleteSkill}
                                    onUpdateSkill={handleUpdateSkill}
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

                <div className="skills__add">
                    <input
                        className="skills__add-input"
                        value={newSkill}
                        onChange={handleNewSkillChange}
                        placeholder="Новый навык"
                    />
                    <button
                        className="skills__add-button"
                        onClick={handleAddSkillClick}
                    >
                        Добавить навык
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Skills;