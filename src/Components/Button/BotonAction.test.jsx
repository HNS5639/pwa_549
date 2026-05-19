import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BotonAccion } from './BotonAction';

describe("Componente BotonAccion", () => {
  it("debe mostrar el texto correctamente", () => {
    render(<BotonAccion texto="Click aquí" />);
    
    const boton = screen.getByText(/click aquí/i);
    expect(boton).toBeInTheDocument();
  });

  it("debe llamar a la función onClick al hacer clic", () => {
    const mockClick = vi.fn(); 
    render(<BotonAccion texto="Eliminar" onClick={mockClick} />);
    
    const boton = screen.getByRole('button');
    
    fireEvent.click(boton);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});