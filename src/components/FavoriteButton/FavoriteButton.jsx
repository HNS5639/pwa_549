import { useNavigate } from "react-router";
import { Routes } from "../../const/routes";

function FavoriteButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(Routes.favorites)}
      className="text-2xl"
    >
      ♥
    </button>
  );
}

export default FavoriteButton;