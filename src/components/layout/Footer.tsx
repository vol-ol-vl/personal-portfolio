const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>
                <a 
                    href="https://github.com/vol-ol-vl" 
                    target="_blank"
                    rel="noopener noreferrer"
                >github.com/vol-ol-vl</a>
            </p>
            <p><a href="mailto:vol.ol.vl@yandex.ru">vol.ol.vl@yandex.ru</a></p>
            <p>&copy; {currentYear}</p>
        </footer>
    )
}

export default Footer;