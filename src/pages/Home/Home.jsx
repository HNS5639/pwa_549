import Card from "../../components/Card/Card";

//recetario de muestra
import { recetario } from "../../../recetas_reales";

function Home() {
  return (
    <>
      <section>
                {recetario.length === 0 ? (
                  <p>No hay recetas pendientes.</p>
                ) : (
                  recetario.map((receta) => (

                      <Card
                        key={receta.id}
                        receta={receta}
                      />
                  ))
                )}
              </section>
    </>
  );
}
export default Home;
