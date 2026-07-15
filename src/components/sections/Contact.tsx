import { useState } from "react";

const Contact = () => {
    const [inputName, setInputName] = useState('Ольга');
    const handleChange = (event) => {
        setInputName(event.target.value);
    };

    return (
        <section>
            <h2>Связаться со мной</h2>
            <input 
                value={inputName}
                onChange={handleChange}
            />
            <p>Привет, {inputName}!</p>
        </section>
    );

};

export default Contact;