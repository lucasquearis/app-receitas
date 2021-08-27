import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ComidasDetails from '../pages/ComidasDetails';
import fetchMock from '../../cypress/mocks/fetch';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

describe('Testes para a pagina de detalhes de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
    localStorage.clear();
  });

  it('Verifica se todos os elementos sao mostrados na tela', async () => {
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);

    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('share-btn');
    await screen.findByTestId('favorite-btn');
    await screen.findByTestId('recipe-category');
    await screen.findByTestId('0-ingredient-name-and-measure');
    await screen.findByTestId('instructions');
    await screen.findByTestId('video');
    await screen.findByTestId('0-recomendation-card');
    await screen.findByTestId('start-recipe-btn');
  });
  it('Verifica se foram feitas duas requisicoes a API', async () => {
    act(() => {
      renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    });

    act(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });
  });

  it('Verifica se o botao de iniciar receita desaparece caso ja tenha sido feita', async () => {
    const doneRecipes = [{
      "id": "52771",
      "type": "comida",
      "area": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      "doneDate": "22/6/2020",
      "tags": ["Pasta", "Curry"]
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    waitForElementToBeRemoved(null).catch(() => expect(screen.queryByTestId('start-recipe-btn')).toBeNull());
  });

  it('Verifica se o texto muda caso a receita ja tenha sido iniciada', async () => {
    localStorage.clear();
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const continueRecipeButton = await screen.findByTestId('start-recipe-btn');
    expect(continueRecipeButton).toHaveTextContent('Continuar Receita');
  });

  it('Verifica se o link para comecar receita redireciona para a pagina correta', async () => {
    const { history } = renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const continueRecipeButton = await screen.findByTestId('start-recipe-btn');

    userEvent.click(continueRecipeButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/comidas/52771/in-progress');
  });

  it('Verifica se o botao de compartilhar copia o link da receita', async () => {
    copy.mockImplementation(() => null);
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const copyLink = await screen.findByTestId('share-btn');

    userEvent.click(copyLink);

    expect(copy).toHaveBeenCalled();
  });

  it('Verifica se o coracao do botao de favoritar vem preenchido', async () => {
    const favoriteRecipes = [{
      "id": "52771",
      "type": "comida",
      "area": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const favoriteImage = await screen.findByTestId('favorite-btn');

    expect(favoriteImage).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Verifica se o coracao do botao de favoritar vem vazio', async () => {
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const favoriteImage = await screen.findByTestId('favorite-btn');

    expect(favoriteImage).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  it('Verifica que se clicar no botao favorita ou desfavorita a receita', async () => {
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);
    const favoriteImage = await screen.findByTestId('favorite-btn');

    expect(favoriteImage).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteImage);
    expect(favoriteImage).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteImage);
    expect(favoriteImage).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
