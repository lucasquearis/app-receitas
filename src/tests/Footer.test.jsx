import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

describe('Testa barra inferior de navegação', () => {
  it('Link para bebidas', () => {
    const { history } = renderWithRouter(<App />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    expect(drinksIcon).toBeInTheDocument();
    expect(drinksIcon).toHaveAttribute('src', drinkIcon);

    fireEvent.click(drinksIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/bebidas');
  });

  it('Link para explorar', () => {
    const { history } = renderWithRouter(<App />);
    const explorationIcon = screen.getByTestId('explore-bottom-btn');

    expect(explorationIcon).toBeInTheDocument();
    expect(explorationIcon).toHaveAttribute('src', exploreIcon);

    fireEvent.click(explorationIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/explorar');
  });

  it('Link para comidas', () => {
    const { history } = renderWithRouter(<App />);
    const foodsIcon = screen.getByTestId('food-bottom-btn');

    expect(foodsIcon).toBeInTheDocument();
    expect(foodsIcon).toHaveAttribute('src', mealIcon);

    fireEvent.click(foodsIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
