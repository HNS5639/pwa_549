import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DetailRecipe from "./DetailRecipe";

const mockToggleFavorite = vi.fn();

vi.mock("../../context/LanguageContext", () => ({
  useLanguage: () => ({ lang: "es" }),
}));

vi.mock("../../utils/useFavorite", () => ({
  useFavorite: () => ({
    toggleFavorite: mockToggleFavorite,
  }),
}));

describe("Componente DetailRecipe", () => {
  const recetaDummy = {
    id: "1",
    image: "test.jpg",
    cookingTime: 30,
    servings: 4,
    isFavorite: false,
    dietary: {
      type: "Vegano",
      isGlutenFree: true,
    },
    content: {
      es: {
        title: "Pizza Vegana",
        description: "Preparar la masa",
        ingredients: ["Harina", "Tomate"],
        instructions: ["Mezclar", "Hornear"],
      },
    },
  };

  const renderComponent = () =>
    render(
      <DetailRecipe receta={recetaDummy} setReceta={() => {}} />
    );

  it("debe renderizar título y descripción", () => {
    renderComponent();

    expect(screen.getByText("Pizza Vegana")).toBeInTheDocument();
    expect(screen.getByText("Preparar la masa")).toBeInTheDocument();
  });

  it("debe renderizar ingredientes", () => {
    renderComponent();

    expect(screen.getByText("Harina")).toBeInTheDocument();
    expect(screen.getByText("Tomate")).toBeInTheDocument();
  });

  it("debe renderizar instrucciones", () => {
    renderComponent();

    expect(screen.getByText("Mezclar")).toBeInTheDocument();
    expect(screen.getByText("Hornear")).toBeInTheDocument();
  });

  it("debe mostrar etiqueta sin gluten", () => {
    renderComponent();

    expect(screen.getByText(/gluten/i)).toBeInTheDocument();
  });

  it("debe ejecutar toggleFavorite al hacer click", () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledWith(recetaDummy);
  });
});