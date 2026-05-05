import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getRecetaById } from "../../service/api";
import Card from "../../Components/Card/Card";

function Details(){
    const { id } = useParams();
    const [receta, setReceta] = useState(null);

  useEffect(() => {
    const cargarReceta = async () => {
      const data = await getRecetaById(id);
      setReceta(data);
    };
    cargarReceta();
  }, [id]);

    return(
        <>
        {receta ? (<div><h1>Prueba de detalles de esta receta</h1><Card receta={receta} /></div>) : <h1>Vacío</h1>}
        </>
    )
}

export default Details;