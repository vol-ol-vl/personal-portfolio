import './Header.css';

type HeaderProps = {
  name: string;
  role: string;
  skillCount: number;
};

const Header = ({name, role, skillCount}: HeaderProps) => {
  return (
    <header className='header'>
      <div className='container'>
        <div className="header__brand">
          <h1>{name}</h1>
          <p>{role}</p>
        </div>
        <p className="header__skill-count">Количество навыков: {skillCount}</p>
      </div>
    </header>
  );
};

export default Header;