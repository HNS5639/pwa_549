import "./Styles.css";
import { Title } from "../Title/Title";

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <a href="/">
          <img src="/logo.png" alt="logo" />
        </a>
      </div>
      <div className="header-titulo">
        <Title text={"Gestor de películas"} />
      </div>
      <nav></nav>
    </header>
  );
};
