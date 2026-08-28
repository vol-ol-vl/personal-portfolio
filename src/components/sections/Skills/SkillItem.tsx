import { memo, useState, type ChangeEvent } from "react";

import type { Skill, SkillCategory } from "../../../types/skill";

type SkillItemProps = {
    skill: Skill;
    onDeleteSkill: (skillId: number) => void;
    onUpdateSkill: (skillId: number, skillName: string) => boolean;
    onUpdateSkillCategory: (skilId: number, skillCategory: SkillCategory) => void
}

const SkillItem = ({
        skill,
        onDeleteSkill,
        onUpdateSkill,
        onUpdateSkillCategory
    }: SkillItemProps ) => {

        const [isEditing, setIsEditing] = useState(false);
        const [skillName, setSkillName] = useState(skill.name);

        const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
            setSkillName(event.currentTarget.value);
        };
        const handleEditClick = () => {
            setIsEditing(true);
        };

        const handleUpdateSkill = () => {
            const isUpdated = onUpdateSkill(
                skill.id,
                skillName
            );

            if (isUpdated) {
                setIsEditing(false);
            }
        };

        const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
            onUpdateSkillCategory(
                skill.id,
                event.currentTarget.value as SkillCategory
            );
        };

        return (
            <li className="skills__item">
                {isEditing ? (
                    <div className="skills__edit">
                        <input
                            className="skills__edit-input"
                            value={skillName}
                            onChange={handleSkillNameChange}
                        />

                        <button
                            className="skills__save-button"
                            onClick={handleUpdateSkill}
                        >
                            Сохранить
                        </button>
                    </div>
                ) : (
                    <div className="skills__info">
                        <span className="skills__name">{skill.name}</span>

                        <button
                            className="skills__edit-button"
                            onClick={handleEditClick}
                        >
                            Редактировать
                        </button>
                    </div>
                )}
                <select
                    className="skills__category-select"
                    value={skill.category}
                    onChange={handleCategoryChange}
                >
                    <option value="language">Язык</option>
                    <option value="other">Другое</option>
                </select>
                <button
                    className="skills__delete-button"
                    onClick={() => onDeleteSkill(skill.id)}
                >
                    Удалить
                </button>
            </li>
        );
    };

export default memo(SkillItem);