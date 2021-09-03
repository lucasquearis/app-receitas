import React from 'react';
import { screen } from '@testing-library/dom';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const foodUrl = '/explorar/comidas/ingredientes';

describe('Testa pagina de explorar comida por area', () => {
  it('Verifica title', () => {
    renderWithRouter(<App />, foodUrl);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Ingredientes');
  });

  it('Verifica icone de perfil', () => {
    renderWithRouter(<App />, foodUrl);
    const iconProfile = screen.getByTestId('profile-top-btn');
    expect(iconProfile).toBeInTheDocument();
  });

  it('Verifica botoes de navegaçao', () => {
    renderWithRouter(<App />, foodUrl);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  it('Testa se rota esta correta', () => {
    const { history } = renderWithRouter(<App />, foodUrl);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
  it('Testa se as comidas aparecem na tela', async () => {
    Object.defineProperty(window, 'location', {
      get() {
        return { href: 'http://localhost/explorar/comidas/ingredientes' };
      },
    });

    renderWithRouter(<App />, foodUrl);
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
