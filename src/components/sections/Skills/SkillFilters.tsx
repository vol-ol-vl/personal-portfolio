import type { ChangeEvent } from "react";
import type { SkillFilter } from "../../../types/skill";

type SkillFiltersProps = {
    search: string;
    category: SkillFilter;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SkillFilters = ({
        search,
        category,
        onSearchChange,
        onCategoryChange
    }: SkillFiltersProps) => {
        return (
            <div className="skills__filters">
                <input
                    value={search}
                    onChange={onSearchChange}
                />
                <select
                    value={category}
                    onChange={onCategoryChange}
                >
                    <option value='all'>Все</option>
                    <option value='language'>Языки программирования</option>
                    <option value='other'>Другие</option>  
                </select>
            </div>
        );
};

export default SkillFilters;