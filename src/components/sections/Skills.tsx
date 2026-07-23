import { useState, type ChangeEvent } from "react";

import type { Skill, SkillFilter } from "../../types/skill";
import { normalizeText } from "../../utils/text";

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
    const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
    const [editingSkillName, setEditingSkillName] = useState('');
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
    const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingSkillName(event.currentTarget.value);
    };
    const handleChangeSkill = (skill: Skill) => {
        setEditingSkillId(skill.id);
        setEditingSkillName(skill.name);
    };
    const handleUpdateSkill = (skillId:number, skillName: string) => {
        onUpdateSkill(skillId, skillName.trim());
        setEditingSkillName('');
        setEditingSkillId(null);
    };
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as SkillFilter);
    };

    return (
        <section>
            <h2>Навыки</h2>
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
            { isVisible && (
                sortedByNameSkills.length > 0 
                   ? <ul>
                        { sortedByNameSkills.map(skill  => (
                            <li key={skill.id}>
                                {(editingSkillId === skill.id)
                                ? <span>
                                    <input 
                                        value={editingSkillName}
                                        onChange={handleSkillNameChange}
                                    />
                                    <button onClick={() => handleUpdateSkill(skill.id, editingSkillName)}>Схранить</button>
                                </span>
                                : <span>
                                    {skill.name}
                                    <button onClick={() => handleChangeSkill(skill)}>Редактировать</button>  
                                </span>
                                }
                                <button onClick={() => onDeleteSkill(skill.id)}>Удалить</button>
                            </li>)
                        )}
                    </ul>
                    : <p>Ничего не найдено</p>
            )}           
            <button onClick={handleToggleVisibility}>{buttonText}</button>
            <input
                value={newSkill}
                onChange={handleNewSkillChange}
            />
            <button onClick={handleAddSkillClick}>Добавить навык</button>
        </section>
    );
}

export default Skills;