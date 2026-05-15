import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filters from './Filters';

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ lang: 'es' })
}));

vi.mock('../../const/texts', () => ({
  texts: {
    es: {
      placeHolder: {
        limpiar: 'Limpiar Filtros'
      }
    }
  }
}));

describe("Componente Filters", () => {
  it("debe renderizar el botón de limpiar filtros con su texto", () => {
    render(<Filters setFiltros={vi.fn()} />);
    expect(screen.getByText('Limpiar Filtros')).toBeInTheDocument();
  });

  it("debe llamar a la función setFiltros al hacer clic en el botón de limpiar", () => {
    const mockSetFiltros = vi.fn();
    render(<Filters setFiltros={mockSetFiltros} />);
    
    const botonLimpiar = screen.getByText('Limpiar Filtros');
    fireEvent.click(botonLimpiar);
    expect(mockSetFiltros).toHaveBeenCalled();
  });
});