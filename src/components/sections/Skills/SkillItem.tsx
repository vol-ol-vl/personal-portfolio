import { memo, useState, type ChangeEvent } from "react";

import type { Skill, SkillCategory } from "../../../types/skill";

type SkillItemProps = {
  skill: Skill;
  onDeleteSkill: (skillId: number) => void | Promise<boolean>;
  onUpdateSkill: (
    skillId: number,
    skillName: string,
  ) => boolean | Promise<boolean>;
  onUpdateSkillCategory: (
    skillId: number,
    skillCategory: SkillCategory,
  ) => void;
};

const SkillItem = ({
  skill,
  onDeleteSkill,
  onUpdateSkill,
  onUpdateSkillCategory,
}: SkillItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillName, setSkillName] = useState(skill.name);
  const [isSaving, setIsSaving] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSkillName(event.currentTarget.value);
  };
  const handleEditClick = () => {
    setSkillName(skill.name);
    setUpdateError(false);
    setIsEditing(true);
  };

  const handleDeleteSkill = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(false);
      const isDeleted = await onDeleteSkill(skill.id);
      if (isDeleted === false) {
        setDeleteError(true);
      }
    } catch (error) {
      console.error("Ошибка удаления навыка:", error);
      setDeleteError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSkill = async () => {
    try {
      setIsSaving(true);
      setUpdateError(false);
      const isUpdated = await onUpdateSkill(skill.id, skillName);

      if (isUpdated) {
        setIsEditing(false);
      } else {
        setUpdateError(true);
      }
    } catch (error) {
      console.error("Ошибка изменения навыка:", error);
      setUpdateError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onUpdateSkillCategory(skill.id, event.currentTarget.value as SkillCategory);
  };

  return (
    <li className="skills__item">
      {isEditing ? (
        <div className="skills__edit">
          <input
            className="skills__edit-input"
            value={skillName}
            disabled={isSaving}
            onChange={handleSkillNameChange}
          />

          <button
            className="skills__save-button"
            disabled={isSaving}
            onClick={handleUpdateSkill}
          >
            Сохранить
          </button>
          {updateError && <span>Обновление завершилось неудачно</span>}
        </div>
      ) : (
        <div className="skills__info">
          <span className="skills__name">{skill.name}</span>

          <button className="skills__edit-button" onClick={handleEditClick}>
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
        disabled={isDeleting}
        onClick={handleDeleteSkill}
      >
        Удалить
      </button>
      {deleteError && <span>Удаление завершилось неудачно</span>}
    </li>
  );
};

export default memo(SkillItem);
