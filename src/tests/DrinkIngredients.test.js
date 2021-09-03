import React from 'react';
import { screen } from '@testing-library/dom';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const URL = '/explorar/bebidas/ingredientes';

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
  it('Testa se as bebidas aparecem na tela', async () => {
    Object.defineProperty(window, 'location', {
      get() {
        return { href: 'http://localhost/explorar/bebidas/ingredientes' };
      },
    });
    renderWithRouter(<App />, URL);
    await waitForDomChange();

    const ELEMENTS = 11;
    for (let i = 0; i <= ELEMENTS; i += 1) {
      const card = screen.getByTestId(`${i}-ingredient-card`);
      const image = screen.getByTestId(`${i}-card-img`);
      const name = screen.getByTestId(`${i}-card-name`);
      expect(card).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    }
  });
});
