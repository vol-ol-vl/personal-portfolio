import { useState, type ChangeEvent } from "react";

import type { Skill } from "../../types/skill";

type SkillsProps = {
    skills: Skill[],
    onAddSkill: (skillName: string) => void,
    onDeleteSkill: (skillId: number) => void,
    onUpdateSkill: (skillId: number, skillName: string) => void
}

const normalizeText = (text: string) => text.trim().toLowerCase();

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
    const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingSkillName(event.currentTarget.value);
    };
    const handleChangeSkill = (skill: Skill) => {
        setEditingSkillId(skill.id);
        setEditingSkillName(skill.name);
    };
    const handleUpdateSkill= (skillId:number, skillName: string) => {
        onUpdateSkill(skillId, skillName.trim());
        setEditingSkillName('');
        setEditingSkillId(null);
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
                            </li>
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