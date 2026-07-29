import { useState, type ChangeEvent } from "react";

type AddSkillFormProps = {
    onAddSkill: (skillName: string) => boolean;
};
const AddSkillForm = ({onAddSkill}: AddSkillFormProps) => {

    const [newSkill, setNewSkill] = useState('');

    const handleNewSkillChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewSkill(event.currentTarget.value);
    };
    const handleAddSkillClick = () => {
        const isAdded = onAddSkill(newSkill);

        if (isAdded) setNewSkill('');
    };

    return (
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
    );
};

export default AddSkillForm;