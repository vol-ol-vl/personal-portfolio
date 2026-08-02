import type { ChangeEvent } from "react";
import type { SkillFilter, SortOrder} from "../../../types/skill";

type SkillFiltersProps = {
    search: string;
    category: SkillFilter;
    sortOrder: SortOrder;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onSortOrderChange: () => void;
};
const SkillFilters = ({
        search,
        category,
        sortOrder,
        onSearchChange,
        onCategoryChange,
        onSortOrderChange,
    }: SkillFiltersProps) => {
        const sortButtonText =
            sortOrder === "asc"
                ? "Сортировка: А–Я"
                : "Сортировка: Я–А";

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
                <button
                    className="skills__sort-button"
                    onClick={onSortOrderChange}>
                        {sortButtonText}
                </button>
            </div>
        );
};

export default SkillFilters;