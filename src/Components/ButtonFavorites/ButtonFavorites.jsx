import { updateFavorite } from "../../service/api";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

function ButtonFavorite({ receta, setRecetario }) {
  const toggleFavorite = async (receta) => {
    const nuevoValor = !receta.isFavorite;
    await updateFavorite(receta, nuevoValor);
    setRecetario((prev) =>
      prev.map((r) =>
        r.id === receta.id ? { ...r, isFavorite: nuevoValor } : r,
      ),
    );
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(receta);
        }}
        className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1 shadow z-10 hover:scale-110 transition"
      >
        {receta.isFavorite ? (
          <HeartIcon className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </>
  );
}

export default ButtonFavorite;
