import { Link } from "react-router";

function LogoButton() {
  return (
    <Link to="/home" className="flex items-center gap-4">
      <img
        src="https://i.postimg.cc/kg703smH/Logo-Recetario.png"
        alt="Logo"
        className="w-10 h-10 object-contain"
      />

      <span className="text-50xl font-serif tracking-wide">
        +549
      </span>
    </Link>
  );
}

export default LogoButton;