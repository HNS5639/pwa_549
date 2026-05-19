import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Title from "./Title";

describe("Componente Title", () => {

  it("debe renderizar el texto recibido por props", () => {
    render(<Title text="Recetas favoritas" />);

    expect(
      screen.getByText("Recetas favoritas")
    ).toBeInTheDocument();
  });

  it("debe renderizar el ícono cuando se recibe", () => {
    render(<Title text="Recetas" icon="🍕" />);

    expect(screen.getByText("🍕")).toBeInTheDocument();
  });

  it("no debe renderizar ícono si no se recibe", () => {
    render(<Title text="Recetas" />);

    expect(screen.queryByText("🍕")).not.toBeInTheDocument();
  });

});