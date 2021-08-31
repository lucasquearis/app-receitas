import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa a página ExploreMeals e ExploreDrinks', () => {
  const ExploreMeals = '/explorar/comidas';
  const ExploreDrinks = '/explorar/bebidas';
  it('Testa Elemento com o atributo data-testid="explore-by-ingredient"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ExploreMeals);
    const ingredients = await screen.findByTestId('explore-by-ingredient');
    expect(ingredients).toBeInTheDocument();
    userEvent.click(ingredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('Testa Elemento com o atributo data-testid="explore-by-area"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ExploreMeals);
    const area = await screen.findByTestId('explore-by-area');
    expect(area).toBeInTheDocument();
    userEvent.click(area);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('Testa Elemento com o atributo data-testid="explore-surprise"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ExploreMeals);
    const surprise = await screen.findByTestId('explore-surprise');
    expect(surprise).toBeInTheDocument();
    userEvent.click(surprise);
    const { pathname } = history.location;
    expect(pathname).toContain('/comidas/');
  });
  it('Testa Elemento com o atributo data-testid="explore-by-ingredient"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ExploreDrinks);
    const ingredients = await screen.findByTestId('explore-by-ingredient');
    expect(ingredients).toBeInTheDocument();
    userEvent.click(ingredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('Testa Elemento com o atributo data-testid="explore-surprise"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ExploreDrinks);
    const surprise = await screen.findByTestId('explore-surprise');
    expect(surprise).toBeInTheDocument();
    userEvent.click(surprise);
    const { pathname } = history.location;
    expect(pathname).toContain('/bebidas/');
  });
});
