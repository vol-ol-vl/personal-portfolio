import { useState, type ChangeEvent } from "react";

import type { Skill } from "../../../types/skill";
import { normalizeText } from "../../../utils/text";

type SkillItemProps = {
    skill: Skill;
    onDeleteSkill: (skillId: number) => void;
    onUpdateSkill: (skillId: number, skillName: string) => boolean;
}

const SkillItem = ({
        skill,
        onDeleteSkill,
        onUpdateSkill
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

                <button
                    className="skills__delete-button"
                    onClick={() => onDeleteSkill(skill.id)}
                >
                    Удалить
                </button>
            </li>
        );
    };

export default SkillItem;