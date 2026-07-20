type HeaderProps = {
  name: string;
  role: string;
  skillCount: number;
};

const Header = ({name, role, skillCount}: HeaderProps) => {
  return (
    <header>
        <h1>{name}</h1>
        <p>{role}</p>
        <p>Количество навыков: {skillCount}</p>
    </header>
  );
};

export default Header;