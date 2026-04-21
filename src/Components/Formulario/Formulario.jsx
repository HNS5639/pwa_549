import { useState } from "react";
import { BotonAccion } from "../Button/Button";
import "./Styles.css";

export const Formulario = ({
  alEnviar,
  valoresIniciales = {
    titulo: "",
    director: "",
    anio: "",
    genero: "",
    tipo: "",
    id: "",
    rating: "",
    url_imagen: "",
    vista: "",
  },
  textoBoton = "Crear",
}) => {
  const [titulo, setTitulo] = useState(valoresIniciales.titulo);
  const [director, setDirector] = useState(valoresIniciales.director);
  const [anio, setAnio] = useState(valoresIniciales.anio);
  const [genero, setGenero] = useState(valoresIniciales.genero);
  const [tipo, setTipo] = useState(valoresIniciales.tipo);
  const [id, setId] = useState(valoresIniciales.id);
  const [rating, setRating] = useState(valoresIniciales.rating);
  const [url_imagen, setUrl_imagen] = useState(valoresIniciales.url_imagen);
  const [vista, setVista] = useState(valoresIniciales.vista);

  const manejarEnvio = (e) => {
    e.preventDefault();

    //Objeto pelicula
    const nuevaPelicula = {
      titulo: titulo,
      director: director,
      anio: anio,
      genero: genero,
      tipo: tipo,
      id: id,
      rating: rating,
      url_imagen: url_imagen,
      vista: vista,
    };

    //envia los datos al componente padre (Create.jsx)
    alEnviar(nuevaPelicula);

    //Limpia Form
    setTitulo("");
    setDirector("");
    setAnio("");
    setGenero("");
    setTipo("");
    setId("");
    setRating("");
    setUrl_imagen("");
    setVista("");
  };

  return (
    <form className="formulario-container" onSubmit={manejarEnvio}>
      <div className="form-group">
        <label>Título: </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Director: </label>
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Año: </label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Género: </label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Drama">Drama</option>
          <option value="Infantil">Infantil</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tipo: </label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="" disabled hidden>Seleccione</option>
          <option value="Pelicula">Película</option>
          <option value="Serie">Serie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Url de Imagen: </label>
        <input
          type="url"
          value={url_imagen}
          onChange={(e) => setUrl_imagen(e.target.value)}
          /*required*/
        />
      </div>
      <div className="form-group pares">
        <label>Rating: </label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>
        <label>Vista: </label>
        <input
          type="checkbox"
          checked={vista}
          onChange={(e) => setVista(e.target.checked)}

        />
      </div>

      <BotonAccion texto={textoBoton} tipo="submit" />
    </form>
  );
};
