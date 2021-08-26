import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o Footer', () => {
  it('Testa Elemento com o atributo data-testid="footer"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const menu = await screen.findByTestId('footer');
    expect(menu).toBeInTheDocument();
  });
  it('Testa Elemento com o atributo data-testid="drinks-bottom-btn"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const drinks = await screen.findByTestId('drinks-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(drinks).toHaveAttribute('src', 'drinkIcon.svg');
    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
  it('Testa Elemento com o atributo data-testid="explore-bottom-btn"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const explore = await screen.findByTestId('explore-bottom-btn');
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveAttribute('src', 'exploreIcon.svg');
    userEvent.click(explore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('Testa Elemento com o atributo data-testid="food-bottom-btn"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const foods = await screen.findByTestId('food-bottom-btn');
    expect(foods).toBeInTheDocument();
    expect(foods).toHaveAttribute('src', 'mealIcon.svg');
    userEvent.click(foods);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
  it('O menu inferior deve ficar fixado sempre ao final da página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const menu = await screen.findByTestId('footer');
    expect(menu).toHaveStyle('position: fixed; bottom: 0');
  });
});
