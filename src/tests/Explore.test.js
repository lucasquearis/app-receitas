import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa a pagina Explore', () => {
  it('Testa Elemento com o atributo data-testid="explore-food"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    const foodLink = screen.getByTestId('explore-food');
    expect(foodLink).toBeInTheDocument();
    userEvent.click(foodLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
  it('Testa Elemento com o atributo data-testid="explore-drinks"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    const drinksLink = screen.getByTestId('explore-drinks');
    expect(drinksLink).toBeInTheDocument();
    userEvent.click(drinksLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
