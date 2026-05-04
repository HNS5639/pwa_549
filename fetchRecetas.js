import fs from 'fs';
// 1. Configuración
const API_KEY = 'key'; // 
const AMOUNT = 100; // Cantidad de recetas
const URL = `https://api.spoonacular.com/recipes/random?number=${AMOUNT}&apiKey=${API_KEY}`;

async function fetchAndFormatRecipes() {
  console.log(`Conectando a Spoonacular para obtener ${AMOUNT} recetas...`);

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (data.status === 'failure' || !data.recipes) {
      console.error("Error de la API:", data.message || "Límite alcanzado o API Key inválida.");
      return;
    }

    console.log("Recetas obtenidas. Formateando al modelo...");

    // 2. Mapear la respuesta de Spoonacular a tu modelo exacto
    const recetasFormateadas = data.recipes.map(recipe => {
      
      // -- Extraer Ingredientes --
      const ingredientesEn = recipe.extendedIngredients 
        ? recipe.extendedIngredients.map(ing => ing.original) 
        : ["No ingredients found"];

      // -- Extraer Instrucciones --
      let instruccionesEn = [];
      if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
        // Spoonacular lo da en un array de objetos "steps"
        instruccionesEn = recipe.analyzedInstructions[0].steps.map(s => s.step);
      } else if (recipe.instructions) {
        // Fallback: Si viene como texto plano o con HTML, lo limpiamos y lo metemos en un array de 1 paso
        instruccionesEn = [recipe.instructions.replace(/<[^>]*>?/gm, '')];
      }

      // -- Limpiar la descripción (summary) de etiquetas HTML --
      const cleanDescription = recipe.summary ? recipe.summary.replace(/<[^>]*>?/gm, '') : "";

      // -- Determinar el tipo de dieta basado en los booleanos de la API --
      let tipoDieta = "carne_blanca"; // Por defecto
      if (recipe.vegan) tipoDieta = "vegano";
      else if (recipe.vegetarian) tipoDieta = "vegetariano";
      // (Spoonacular no avisa explícitamente si es carne roja, así que dejamos la blanca como comodín)

      return {
        id: recipe.id,
        image: recipe.image || "",
        isFavorite: false, // Dato local tuyo, lo iniciamos en false
        cookingTime: recipe.readyInMinutes || 0,
        servings: recipe.servings || 1,
        dietary: {
          isGlutenFree: recipe.glutenFree || false,
          type: tipoDieta
        },
        content: {
          en: {
            title: recipe.title || "Untitled",
            description: cleanDescription,
            ingredients: ingredientesEn,
            instructions: instruccionesEn
          },
          es: {
            // Spoonacular solo devuelve en inglés, así que copiamos la data con una etiqueta
            // para que sepas que esto requiere traducción manual o pasar por otra API.
            title: recipe.title + " (Falta traducir)",
            description: "Texto pendiente de traducción al español.",
            ingredients: ingredientesEn.map(i => `(EN) ${i}`),
            instructions: instruccionesEn.map(i => `(EN) ${i}`)
          }
        }
      };
    });

    // 3. Guardar el resultado en un archivo JSON
    fs.writeFileSync('recetas_reales.json', JSON.stringify(recetasFormateadas, null, 2), 'utf8');
    console.log(`¡Éxito! Se generó el archivo recetas_reales.json con ${recetasFormateadas.length} recetas listas para usar.`);

  } catch (error) {
    console.error("Ocurrió un error en la ejecución:", error);
  }
}

fetchAndFormatRecipes();