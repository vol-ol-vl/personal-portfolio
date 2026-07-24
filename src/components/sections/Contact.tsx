import { useState, type ChangeEvent } from "react";

import './Contact.css';

const Contact = () => {
  const [inputName, setInputName] = useState('Ольга');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputName(event.currentTarget.value);
  };

  return (
    <section className="contact">
      <div className="container">
        <h2 className="contact__title">
          Связаться со мной
        </h2>

        <div className="contact__content">
          <label className="contact__label" htmlFor="contact-name">
            Ваше имя
          </label>

          <input
            className="contact__input"
            id="contact-name"
            value={inputName}
            onChange={handleChange}
          />

          <p className="contact__greeting">
            Привет, {inputName}!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;