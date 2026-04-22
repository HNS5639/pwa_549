// objeto receta
const receta= {
  id: "number",
  image: "string: url de la imagen",
  isFavorite: "boolean: indica si es o no favorito",
  cookingTime: "number: indica los minutos que lleva la elaboración",
  servings: "number: indica para cuantas personas es la receta (porciones)",
  dietary: {
    isGlutenFree: "boolean: indica si es libre de gluten",
    type: "string: vegano, vegetariano, carne_roja, carne_blanca" 
  },
  content: { //opciones de idiomas en: inglés, es: español (array)
    en: {
      title: "string",
      description: "string",
      ingredients: [ //array de ingredientes
        "string: ingregiente 1",
        "string: ingrediente 2"
      ],
      "instructions": [ //array de instrucciones (pasos)
        "string: paso 1",
        "string: paso 2"
      ]
    },
    es: { //mismos atributos que en el otro idioma (traducidos a español)
      title: "",
      description: "",
      ingredients: [
        "",
        ""
      ],
      instructions: [
        "",
        ""
      ]
    }
  }
}