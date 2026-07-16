import { useState, type ChangeEvent } from "react";

type SkillsProps = {
    skills: string[]
}

const Skills = ({skills}: SkillsProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState('');

    const normalizedSearch = search.toLowerCase();
    const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(normalizedSearch));
    const buttonText = isVisible ? 'Скрыть навыки' : 'Показать навыки';

    const handleClick = () => {
        setIsVisible(isVisible => !isVisible);
    };
     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    return (
        <section>
            <h2>Навыки</h2>
            <input
                value={search}
                onChange={handleChange}
            />
            {isVisible && (
                filteredSkills.length > 0 
                   ? <ul>
                        {filteredSkills.map(skill  => (
                            <li key={skill}>{skill}</li>
                            )
                        )}
                    </ul>
                    : <p>Ничего не найдено</p>
            )}           
            <button onClick={handleClick}>{buttonText}</button>
        </section>
    );
}

export default Skills;