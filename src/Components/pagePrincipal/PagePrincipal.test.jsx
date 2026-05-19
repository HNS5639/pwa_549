import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PagePrincipal from "./PagePrincipal";

vi.mock("../../context/LanguageContext", () => ({
  useLanguage: () => ({ lang: "es" }),
}));

vi.mock("../Filters/Filters", () => ({
  default: () => <div>Filtros Mock</div>,
}));

vi.mock("../Card/Card", () => ({
  default: ({ receta }) => <div>{receta.content.es.title}</div>,
}));

describe("Componente PagePrincipal", () => {
  const recetasDummy = [
    {
      id: "1",
      content: {
        es: {
          title: "Pizza",
        },
      },
    },
    {
      id: "2",
      content: {
        es: {
          title: "Empanadas",
        },
      },
    },
  ];

  const renderComponent = (props = {}) =>
    render(
      <PagePrincipal
        filtros={{}}
        setFiltros={() => {}}
        recetario={recetasDummy}
        setRecetario={() => {}}
        loaderRef={null}
        loading={false}
        removeFavorite={() => {}}
        {...props}
      />
    );

  it("debe renderizar recetas", () => {
    renderComponent();

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Empanadas")).toBeInTheDocument();
  });

  it("debe mostrar mensaje de error si no hay recetas", () => {
    renderComponent({ recetario: [] });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("debe mostrar loader cuando loading es true", () => {
    renderComponent({ loading: true });

    expect(screen.getByText(/no receta/i)).toBeInTheDocument();
  });

  it("debe mostrar filtros al hacer click", () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(screen.getByText("Filtros Mock")).toBeInTheDocument();
  });
});