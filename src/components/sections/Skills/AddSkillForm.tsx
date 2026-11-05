import { useState, type ChangeEvent } from "react";

type AddSkillFormProps = {
  onAddSkill: (skillName: string) => boolean | Promise<boolean>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  reset?: () => void;
};
const AddSkillForm = ({
  onAddSkill,
  isLoading = false,
  isError = false,
  isSuccess = false,
  reset,
}: AddSkillFormProps) => {
  const [newSkill, setNewSkill] = useState("");

  const handleNewSkillChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (reset) reset();
    setNewSkill(event.currentTarget.value);
  };
  const handleAddSkillClick = async () => {
    if (isLoading) return;

    const isAdded = await onAddSkill(newSkill);

    if (isAdded) setNewSkill("");
  };

  return (
    <div className="skills__add">
      <input
        className="skills__add-input"
        value={newSkill}
        onChange={handleNewSkillChange}
        placeholder="Новый навык"
        disabled={isLoading}
      />
      <button
        className="skills__add-button"
        onClick={handleAddSkillClick}
        disabled={isLoading}
      >
        {isLoading ? "Добавление..." : "Добавить навык"}
      </button>

      {isError ? (
        <p className="skills__error">
          Не удалось добавить навык. Попробуйте ещё раз.
        </p>
      ) : isSuccess ? (
        <p className="skills__success">Навык успешно добавлен!</p>
      ) : null}
    </div>
  );
};

export default AddSkillForm;
