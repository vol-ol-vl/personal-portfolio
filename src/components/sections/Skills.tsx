import { useState, type ChangeEvent } from "react";

import type { Skill } from "../../types/skill";

type SkillsProps = {
    skills: Skill[],
    onAddSkill: (skillName: string) => void
}

const normalizeText = (text: string) => text.trim().toLowerCase();

const Skills = ({skills, onAddSkill}: SkillsProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [newSkill, setNewSkill] = useState('');

    const normalizedSearch = normalizeText(search);
    const filteredSkills = skills.filter(skill => normalizeText(skill.name).includes(normalizedSearch));
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

    return (
        <section>
            <h2>Навыки</h2>
            <input
                value={search}
                onChange={handleSearchChange}
            />
            {isVisible && (
                filteredSkills.length > 0 
                   ? <ul>
                        {filteredSkills.map(skill  => (
                            <li key={skill.id}>{skill.name}</li>
                            )
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