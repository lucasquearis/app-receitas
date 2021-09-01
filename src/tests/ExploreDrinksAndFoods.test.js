import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa página de exploração por comida e bebida', () => {
  test('Testa botão "Por Ingredientes" da exploração por comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    const byIngredient = screen.getByRole('button', { name: 'Por Ingredientes' });
    expect(byIngredient).toBeInTheDocument();
    fireEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  test('Testa botão "Por Ingredientes" da exploração por bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    const byIngredient = screen.getByRole('button', { name: 'Por Ingredientes' });
    expect(byIngredient).toBeInTheDocument();
    fireEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  test('Testa botão "Me Surpreenda"', () => {

  });
});
