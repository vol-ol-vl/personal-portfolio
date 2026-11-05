import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router";

import type {
  SkillFilter,
  SortOrder,
  SkillCategory,
} from "../../../types/skill";
import { normalizeText } from "../../../utils/text";

import SkillItem from "./SkillItem";
import SkillFilters from "./SkillFilters";
import AddSkillForm from "./AddSkillForm";

import "./Skills.css";
import useToggle from "../../../hooks/useToggle";

import {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useUpdateSkillCategoryMutation,
} from "../../../store/api/skillsApi";

const Skills = () => {
  const {
    data: skills = [],
    isLoading: isSkillsLoading,
    isError: isSkillsError,
  } = useGetSkillsQuery();
  const [
    addSkillRequest,
    {
      isLoading: isAddingSkill,
      isError: isAddSkillError,
      isSuccess: isAddSkillSuccess,
      reset: resetAddSkill,
    },
  ] = useAddSkillMutation();
  const [deleteSkillRequest] = useDeleteSkillMutation();
  const [updateSkillRequest] = useUpdateSkillMutation();
  const [updateSkillCategoryRequest] = useUpdateSkillCategoryMutation();

  const { isOpen: isVisible, toggle } = useToggle(true);
  const skillCategories = ["language", "other"] as const;
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const isSkillCategory = (value: string): value is SkillCategory => {
    return skillCategories.some((category) => category === value);
  };

  const paramsGetCategory = searchParams.get("category");
  let category: SkillFilter = "all";

  if (paramsGetCategory !== null && isSkillCategory(paramsGetCategory)) {
    category = paramsGetCategory;
  }
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredSkills = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return skills.filter((skill) => {
      const matchesSearch = normalizeText(skill.name).includes(
        normalizedSearch,
      );
      const matchesCategory = category === "all" || skill.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [skills, search, category]);

  const sortedByNameSkills = useMemo(() => {
    return [...filteredSkills].sort((skillA, skillB) => {
      const comparison = normalizeText(skillA.name).localeCompare(
        normalizeText(skillB.name),
      );

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredSkills, sortOrder]);

  const isValidSkillName = useCallback(
    (skillName: string, skillId?: number): boolean => {
      const normalizedSkillName = normalizeText(skillName);

      if (normalizedSkillName.length === 0) {
        return false;
      }

      const isDuplicate = skills.some(
        (skill) =>
          skill.id !== skillId &&
          normalizeText(skill.name) === normalizedSkillName,
      );

      return !isDuplicate;
    },
    [skills],
  );

  const buttonText = isVisible ? "Скрыть навыки" : "Показать навыки";

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const changedSearch = event.currentTarget.value;
    setSearchParams((prev) => {
      if (changedSearch.length) {
        prev.set("search", changedSearch);
      } else {
        prev.delete("search");
      }

      return prev;
    });
  };

  const handleAddSkill = useCallback(
    async (skillName: string): Promise<boolean> => {
      if (!isValidSkillName(skillName)) {
        return false;
      }
      try {
        await addSkillRequest({
          name: skillName.trim(),
          category: "other",
        }).unwrap();

        return true;
      } catch (error) {
        console.error("Ошибка добавления навыка:", error);
        return false;
      }
    },
    [isValidSkillName, addSkillRequest],
  );

  const handleDeleteSkill = useCallback(
    (skillId: number) => {
      deleteSkillRequest(skillId);
    },
    [deleteSkillRequest],
  );

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.currentTarget.value as SkillFilter;
    setSearchParams((prev) => {
      if (selectedCategory === "all") {
        prev.delete("category");
      } else {
        prev.set("category", selectedCategory);
      }
      return prev;
    });
  };

  const handleUpdateSkill = useCallback(
    (skillId: number, skillName: string): boolean => {
      if (!isValidSkillName(skillName, skillId)) {
        return false;
      }
      updateSkillRequest({ skillId, skillName: skillName.trim() });
      return true;
    },
    [isValidSkillName, updateSkillRequest],
  );

  const handleUpdateSkillCategory = (
    skillId: number,
    skillCategory: SkillCategory,
  ) => {
    updateSkillCategoryRequest({ skillId, skillCategory });
  };

  const handleSortOrderChange = () => {
    setSortOrder((previousSortOrder) =>
      previousSortOrder === "asc" ? "desc" : "asc",
    );
  };

  if (isSkillsLoading) {
    return <p>Загрузка навыков...</p>;
  }

  if (isSkillsError) {
    return <p>Не удалось загрузить навыки. Попробуйте позже.</p>;
  }

  return (
    <section className="skills">
      <div className="container">
        <h2 className="skills__title">Навыки</h2>

        <SkillFilters
          search={search}
          category={category}
          sortOrder={sortOrder}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortOrderChange={handleSortOrderChange}
        />

        {isVisible &&
          (sortedByNameSkills.length > 0 ? (
            <ul className="skills__list">
              {sortedByNameSkills.map((skill) => (
                <SkillItem
                  skill={skill}
                  key={skill.id}
                  onDeleteSkill={handleDeleteSkill}
                  onUpdateSkill={handleUpdateSkill}
                  onUpdateSkillCategory={handleUpdateSkillCategory}
                />
              ))}
            </ul>
          ) : (
            <p className="skills__empty">Ничего не найдено</p>
          ))}

        <button className="skills__toggle" onClick={toggle}>
          {buttonText}
        </button>

        <AddSkillForm
          onAddSkill={handleAddSkill}
          isLoading={isAddingSkill}
          isError={isAddSkillError}
          isSuccess={isAddSkillSuccess}
          reset={resetAddSkill}
        />
      </div>
    </section>
  );
};

export default Skills;
