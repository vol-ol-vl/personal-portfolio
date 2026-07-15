import { useState } from "react";

type SkillsProps = {
    skills: string[]
}
const Skills = ({skills}: SkillsProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const buttonText = isVisible ? 'Скрыть навыки' : 'Показать навыки';

    const handleClick = () => {
        setIsVisible(isVisible => !isVisible);
    };
    
    return (
        <section>
            <h2>Навыки</h2>
            {isVisible && (
                <ul>
                    {skills.map(skill  => (
                        <li key={skill}>{skill}</li>
                        )
                    )}
                </ul>
            )}           
            <button onClick={handleClick}>{buttonText}</button>
        </section>
    );
}

export default Skills;