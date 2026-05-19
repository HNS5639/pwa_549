import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ lang: 'es' })
}));

vi.mock('../../const/texts', () => ({
  texts: {
    es: {
      footer: {
        derechos: 'Todos los derechos reservados',
        desarrollado: 'Desarrollado por'
      }
    }
  }
}));

describe("Componente Footer", () => {
  it("debe renderizar el contenido del pie de página correctamente", () => {
    render(<Footer />);
    const copyrightText = screen.queryByText(/derechos/i) || screen.queryByRole('contentinfo');
    expect(copyrightText).toBeInTheDocument();
  });
});