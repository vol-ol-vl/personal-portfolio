import './Header.css';
import { useTheme } from '../../context/ThemeContext';

type HeaderProps = {
  name: string;
  role: string;
  skillCount: number;
};

const Header = ({name, role, skillCount}: HeaderProps) => {
  const {theme, toggleTheme} = useTheme();

  return (
    <header className={`header header--${theme}`}>
      <div className='container'>
        <div className="header__brand">
          <h1 className='header__name'>{name}</h1>
          <p className='header__role'>{role}</p>
        </div>
        <p className="header__skill-count">Количество навыков: {skillCount}</p>
        <p>Current theme: {theme}</p>
        <button onClick={toggleTheme}>Поменять тему</button>
      </div>
    </header>
  );
};

export default Header;