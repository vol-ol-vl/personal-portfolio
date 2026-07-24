import './About.css';

const About = () => {
    const title = 'Обо мне';
    const paragraphOne = 'Я Frontend-разработчик с опытом более 12 лет. За годы работы я прошла путь от HTML-верстальщика до ведущего инженера-программиста, участвуя в разработке и поддержке крупных проектов, включая Литрес, Rbc и другие проекты с высокой посещаемостью. Мой опыт охватывает полный цикл frontend-разработки: от адаптивной верстки по макетам до реализации сложного клиентского функционала и код-ревью.';
    const paragraphTwo = 'Сейчас я изучаю Frontend-разработку с упором на React и TypeScript. Моя главная цель — не просто освоить технологии, а научиться писать чистый, понятный и поддерживаемый код.';
    const paragraphThree = 'Ближайшие цели: освоить React и TypeScript на уверенном уровне, создать несколько полноценных проектов для портфолио.';

    return (
        <section className="about">
        <div className="container">
            <h2 className="about__title">{title}</h2>
            <div className="about__content">
                <p className="about__paragraph">{paragraphOne}</p>
                <p className="about__paragraph">{paragraphTwo}</p>
                <p className="about__paragraph">{paragraphThree}</p>
            </div>
        </div>
        </section>
    );
}

export default About;