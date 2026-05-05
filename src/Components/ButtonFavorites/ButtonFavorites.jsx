import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

function ButtonFavorite({ isFavorite, onClick }) {
  return (
    <>
      <button
      onClick={onClick}
        className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1 shadow z-10 hover:scale-110 transition"
      >
        {isFavorite ? (
          <HeartIcon className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </>
  );
}

export default ButtonFavorite;
