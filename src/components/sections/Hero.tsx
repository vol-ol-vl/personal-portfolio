const Hero = () => {
    const title = 'Frontend Developer';
    const description = 'Сейчас изучаю React и строю проекты для своего портфолио.';
    const buttonText = 'Связаться';

    return (
        <section>
            <h2>{title}</h2>
            <p>{description}</p>
            <button>{buttonText}</button>
        </section>
    );
};

export default Hero;