
# Recetario Web - Grupo +549 

Este proyecto es una aplicación web de recetas desarrollada para la cátedra de **Programación Web Avanzada**. La plataforma permite explorar platos, filtrar por categorías y gestionar una lista de favoritos personalizada.

## Tecnologías Utilizadas

*   **React** - Biblioteca base para la interfaz.
*   **Tailwind CSS** - Framework para el diseño y estilos.
*   **Vite** - Herramienta de construcción y desarrollo.
*   **React Router** - Gestión de navegación entre páginas.
*   **Vercel** - Hosting y despliegue.
*   **Vitest** - Tests runer.
*   **React Testing Library** - Testeo de componentes React.
*   **JSDOM** - Simulación de navegador.
*   **jest-dom** - Extiende Jest con matchers personalizados.
*   **user-event** - Simulación usuario

## Características Principales

*   **Multilenguaje:** La aplicación cuenta con soporte para dos idiomas.
*   **Navegación:** Páginas dedicadas para el **Home**, **Favoritos** y **Detalles** de cada receta.
*   **Interactividad:** Filtros de búsqueda avanzados y scroll infinito para una mejor experiencia de usuario.
*   **Implentación de testing**

---

## Capturas de Pantalla

### Home
![Captura Home](https://i.ibb.co/XfrQB5Ch/home.png)

### Favoritos
![Captura Favoritos](https://i.ibb.co/99WkGxfh/favoritos.png)

### Detalles
![Captura Detalles](https://i.ibb.co/rRbv9Wrp/detalles.png)

### Filtros de Búsqueda
![Captura Filtros](https://i.ibb.co/d4kjtc35/filtros-Busqueda.png)


---

## Cómo ejecutar el proyecto

Puedes ver la versión en vivo aquí: [https://pwa-549.vercel.app/](https://pwa-549.vercel.app/)

Si deseas ejecutarlo de forma local, sigue estas instrucciones:

1. **Clonar el repositorio:**
   git clone [https://github.com/HNS5639/pwa_549/](https://github.com/HNS5639/pwa_549/)
2. **Instalar las dependencias:**
   npm install
3. **Ejecutar el proyecto en entorno de desarrollo:**
   npm run dev

   
# Testing 

El proyecto utiliza un entorno de testing moderno basado en Vitest y React Testing Library.

## Configuración

El entorno de testing está configurado con:

- `jsdom` como entorno de navegador simulado
- `setupTests.js` para importar `@testing-library/jest-dom`
- Scripts personalizados en `package.json`

## Ejecutar tests

Modo interactivo:

```bash
npm run test
```

Ejecutar tests una sola vez:

```bash
npm run test:run
```

   
