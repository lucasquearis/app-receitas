import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const URL = '/explorar/comidas/ingredientes';

describe('Testa pagina de explorar comida por area', () => {
  it('Verifica title', () => {
    renderWithRouter(<App />, URL);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Ingredientes');
  });

  it('Verifica icone de perfil', () => {
    renderWithRouter(<App />, URL);
    const iconProfile = screen.getByTestId('profile-top-btn');
    expect(iconProfile).toBeInTheDocument();
  });

  it('Verifica botoes de navegaçao', () => {
    renderWithRouter(<App />, URL);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  it('Testa se rota esta correta', () => {
    const { history } = renderWithRouter(<App />, URL);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
});
