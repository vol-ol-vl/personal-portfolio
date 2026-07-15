type HeaderProps = {
  name: string;
  role: string;
};

const Header = ({name, role}: HeaderProps) => {
  return (
    <header>
        <h1>{name}</h1>
        <p>{role}</p>
    </header>
  );
};

export default Header;