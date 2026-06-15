import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ lang: 'es' })
}));

describe("Componente Card", () => {
  const recetaDummy = {
    id: "123",
    image: "test.jpg",
    cookingTime: "30 min",
    servings: "2",
    isFavorite: false,
    content: {
      es: { title: "Receta Test", description: "Descripción de prueba" }
    },
    dietary: { isGlutenFree: true }
  };

  const renderCard = () => {
    return render(
      <BrowserRouter>
        <Card receta={recetaDummy} setRecetario={() => {}} removeFavorite={() => {}} />
      </BrowserRouter>
    );
  };

  it("debe mostrar el título y la descripción de la receta", () => {
    renderCard();
    expect(screen.getByText("Receta Test")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
  });

  it("debe mostrar el tiempo de cocción y porciones", () => {
    renderCard();
    expect(screen.getByText(/30 min/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it("debe navegar a los detalles al hacer clic en la tarjeta", () => {
    renderCard();
    const cardContainer = screen.getByText("Receta Test").closest('div');
    fireEvent.click(cardContainer);
    expect(mockNavigate).toHaveBeenCalledWith('/details/123');
  });
});