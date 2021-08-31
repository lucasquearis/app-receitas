import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import BebidasDetails from '../pages/BebidasDetails';
import fetchMock from '../../cypress/mocks/fetch';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const favoriteButton = 'favorite-btn';
const startRecipeButton = 'start-recipe-btn';
const drinkName = 'Aquamarine';
const drinkImage = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
const whiteHeart = 'whiteHeartIcon.svg';
const blackHeart = 'blackHeartIcon.svg';

describe('Testes para a pagina de detalhes de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
    localStorage.clear();
  });

  it('Verifica se todos os elementos sao mostrados na tela', async () => {
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);

    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('share-btn');
    await screen.findByTestId(favoriteButton);
    await screen.findByTestId('recipe-category');
    await screen.findByTestId('0-ingredient-name-and-measure');
    await screen.findByTestId('instructions');
    await screen.findByTestId('0-recomendation-card');
    await screen.findByTestId(startRecipeButton);
  });

  it('Verifica se foram feitas duas requisicoes a API', async () => {
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);

    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    await act(() => fetchMock());
  });

  it('Verifica se o botao de iniciar desaparece caso ja tenha sido feita', async () => {
    const doneRecipes = [{
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: drinkName,
      image: drinkImage,
      doneDate: '23/6/2020',
      tags: [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    expect(screen.queryByTestId(startRecipeButton)).toBeNull();
    await act(() => fetchMock());
  });

  it('Verifica se o texto muda caso a receita ja tenha sido iniciada', async () => {
    localStorage.clear();
    const inProgressRecipes = {
      cocktails: {
        178319: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const continueRecipeButton = await screen.findByTestId(startRecipeButton);
    expect(continueRecipeButton).toHaveTextContent('Continuar Receita');
  });

  it('Verifica se o link para comecar redireciona para a pagina correta', async () => {
    const { history } = renderWithRouter(
      <BebidasDetails match={ { params: { id: '178319' } } } />,
    );
    const continueRecipeButton = await screen.findByTestId(startRecipeButton);

    userEvent.click(continueRecipeButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/bebidas/178319/in-progress');
  });

  it('Verifica se a funcao copy e chamada ao clicar no botao', async () => {
    copy.mockImplementation(() => null);
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const copyLink = await screen.findByTestId('share-btn');

    userEvent.click(copyLink);

    expect(copy).toHaveBeenCalled();
    screen.getByText(/Link copiado!/i);
  });

  it('Verifica se o coracao do botao de favoritar vem preenchido', async () => {
    const favoriteRecipes = [{
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: drinkName,
      image: drinkImage,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const favoriteImage = await screen.findByTestId(favoriteButton);

    expect(favoriteImage).toHaveAttribute('src', blackHeart);
  });

  it('Verifica se o coracao do botao de favoritar vem vazio', async () => {
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const favoriteImage = await screen.findByTestId(favoriteButton);

    expect(favoriteImage).toHaveAttribute('src', whiteHeart);
  });

  it('Verifica que se clicar no botao favorita ou desfavorita a receita', async () => {
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const favoriteImage = await screen.findByTestId(favoriteButton);

    expect(favoriteImage).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteImage);
    expect(favoriteImage).toHaveAttribute('src', blackHeart);
    userEvent.click(favoriteImage);
    expect(favoriteImage).toHaveAttribute('src', whiteHeart);
  });

  it('Verifica se a receita esta no localStorage ao clicar no botao de fav', async () => {
    const expectedFavoriteRecipes = [
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: drinkName,
        image: drinkImage,
      },
    ];
    renderWithRouter(<BebidasDetails match={ { params: { id: '178319' } } } />);
    const favoriteImage = await screen.findByTestId(favoriteButton);

    userEvent.click(favoriteImage);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toStrictEqual(expectedFavoriteRecipes);
  });
});
