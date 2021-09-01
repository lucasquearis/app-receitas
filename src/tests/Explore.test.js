import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa página inicial de exploração', () => {
  test('Testa botão "Explorar Comidas" da pagina de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    const foodButton = screen.getByRole('button', { name: 'Explorar Comidas' });
    expect(foodButton).toBeInTheDocument();
    fireEvent.click(foodButton);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  test('Testa botão "Explorar Bebidas" da pagina de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    const drinkButton = screen.getByRole('button', { name: 'Explorar Bebidas' });
    expect(drinkButton).toBeInTheDocument();
    fireEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
