import './Hero.css';

const Hero = () => {
    const title = 'Frontend Developer';
    const description = 'Сейчас изучаю React и строю проекты для своего портфолио.';
    const buttonText = 'Связаться';

    return (
        <section className="hero">
            <div className="container">
                <h2 className='hero__title'>{title}</h2>
                <p className='hero__description'>{description}</p>
                <button className='hero__button'>{buttonText}</button>
            </div>  
        </section>
    );
};

export default Hero;