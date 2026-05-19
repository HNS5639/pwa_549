import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const mockToggleLanguage = vi.fn();

vi.mock("../../context/LanguageContext", () => ({
  useLanguage: () => ({
    lang: "es",
    toggleLanguage: mockToggleLanguage,
  }),
}));

describe("Componente Navbar", () => {

  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

  it("debe renderizar placeholder y favoritos en español", () => {
    renderNavbar();

    expect(
      screen.getByPlaceholderText("Buscar...")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/favoritos/i)
    ).toBeInTheDocument();
  });

  it("debe cambiar idioma al hacer click en el botón", () => {
    renderNavbar();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockToggleLanguage).toHaveBeenCalledWith("en");
  });

});