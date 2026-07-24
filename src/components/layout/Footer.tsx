import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__links">
          <a
            className="footer__link"
            href="https://github.com/vol-ol-vl"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/vol-ol-vl
          </a>

          <a
            className="footer__link"
            href="mailto:vol.ol.vl@yandex.ru"
          >
            vol.ol.vl@yandex.ru
          </a>
        </div>

        <p className="footer__copyright">
          &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;