import { NavLink } from 'react-router';

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
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
            end
          >
            Главная
          </NavLink>
         <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            Навыки
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            Контакты
          </NavLink>
        </nav>
        <p className="header__skill-count">Количество навыков: {skillCount}</p>
        <p>Current theme: {theme}</p>
        <button onClick={toggleTheme}>Поменять тему</button>
      </div>
    </header>
  );
};

export default Header;