import "./Styles.css";
import { BotonAccion } from "./../Button/Button";
import { Title } from "./../Title/Title";
import { useNavigate } from "react-router-dom";

// a esta card le quiero pasar toda la info posible
export const CardPrincipal = ({ pelicula, iconoTitulo, eliminarPelicula }) => {
  const navigate = useNavigate();
  
  const imagenPorDefecto = pelicula.tipo === "Serie"
    ? "https://i.ibb.co/jvQNVt25/Serie-Place-Holder.png"
    : pelicula.tipo === "Pelicula"
    ? "https://i.ibb.co/Tx61LJM4/Pelicula-Place-Holder.png"
    : "https://definicion.de/wp-content/uploads/2009/02/error.png";

  const imagenSrc = pelicula.url_imagen && pelicula.url_imagen.trim()
    ? pelicula.url_imagen
    : imagenPorDefecto;
  


  return (
    <div className="pelicula-card">
      <div className="imagen">
        {/* <img src={pelicula.url_imagen} alt={pelicula.titulo} /> */}
        <img src={imagenSrc} alt={pelicula.titulo} />
        
      </div>
      <div className="card-header">
        <Title text={pelicula.titulo} icon={iconoTitulo}></Title>
        <span className="contador-badge">
          {pelicula.tipo}
        </span>
        <span>{"⭐".repeat(pelicula.rating)}</span>
      </div>
      <div className="info-secundaria">
        <div className="director">
          <span>Director: {pelicula.director}</span>
        </div>
        <div className="anio">
          <span>Año de estreno: {pelicula.anio}</span>
        </div>
        <div className="genero">
          <span>Género: {pelicula.genero}</span>
        </div>
      </div>
      <div className="botones">
        <BotonAccion
          texto="Editar"
          onClick={() => navigate(`/edit/${pelicula.id}`)}
        ></BotonAccion>
        <BotonAccion
          texto="Eliminar"
          onClick={() => eliminarPelicula(pelicula.id)}
        ></BotonAccion>
      </div>
    </div>
  );
};
