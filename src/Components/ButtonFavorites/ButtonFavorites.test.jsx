import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonFavorite from './ButtonFavorites';

describe("Componente ButtonFavorite", () => {
  it("debe renderizar el icono de favorito (corazón lleno) cuando isFavorite es true", () => {
    const { container } = render(<ButtonFavorite isFavorite={true} onClick={() => {}} />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toHaveClass('text-red-500');
  });

  it("debe renderizar el icono vacío (corazón outline) cuando isFavorite es false", () => {
    const { container } = render(<ButtonFavorite isFavorite={false} onClick={() => {}} />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toHaveClass('text-gray-400');
  });

  it("debe llamar a la función onClick al hacer clic en el botón", () => {
    const mockClick = vi.fn();
    render(<ButtonFavorite isFavorite={false} onClick={mockClick} />);
    const boton = screen.getByRole('button');
    fireEvent.click(boton);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});