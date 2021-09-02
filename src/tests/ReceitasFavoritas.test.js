import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

jest.mock('clipboard-copy', () => jest.fn());
const copyToClipBoard = require('clipboard-copy');

const url = '/receitas-favoritas';

const cardID = 'favorite-card';
const allBtnID = 'filter-by-all-btn';
const foodBtnID = 'filter-by-food-btn';
const drinkBtnID = 'filter-by-drink-btn';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Testes da pagina de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Verifica se existe os botões de filtros', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const allBtn = screen.getByTestId(allBtnID);
    const foodBtn = screen.getByTestId(foodBtnID);
    const drinkBtn = screen.getByTestId(drinkBtnID);

    expect(allBtn).toBeDefined();
    expect(foodBtn).toBeDefined();
    expect(drinkBtn).toBeDefined();
  });

  it('Verifica se existem 2 cards', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const cards = await screen.findAllByTestId(cardID);

    expect(cards.length).toBe(2);
  });

  it('Verifica se existem todos os elementos dos cards', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const image1 = await screen.findByTestId('0-horizontal-image');
    const title1 = await screen.findByTestId('0-horizontal-name');
    const category1 = await screen.findByTestId('0-horizontal-top-text');
    const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');
    const favoriteBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');

    const image2 = await screen.findByTestId('1-horizontal-image');
    const title2 = await screen.findByTestId('1-horizontal-name');
    const category2 = await screen.findByTestId('1-horizontal-top-text');
    const shareBtn2 = await screen.findByTestId('1-horizontal-share-btn');
    const favoriteBtn2 = await screen.findByTestId('1-horizontal-favorite-btn');

    expect(image1).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(image2).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    expect(title1.innerHTML).toBe('Spicy Arrabiata Penne');
    expect(title2.innerHTML).toBe('Aquamarine');

    expect(category1.innerHTML).toBe('Italian - Vegetarian');
    expect(category2.innerHTML).toBe('Alcoholic');

    expect(shareBtn1).toBeDefined();
    expect(shareBtn2).toBeDefined();

    expect(favoriteBtn1).toBeDefined();
    expect(favoriteBtn1).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    expect(favoriteBtn2).toBeDefined();
    expect(favoriteBtn2).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
  });

  it('Verifica se ao clicar nos filtros, realmente filtram a listagem', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const categoryID = '0-horizontal-top-text';

    const foodBtn = screen.getByTestId(foodBtnID);
    userEvent.click(foodBtn);
    const category = await screen.findByTestId(categoryID);
    expect(category.innerHTML).toBe('Italian - Vegetarian');

    const drinkBtn = screen.getByTestId(drinkBtnID);
    userEvent.click(drinkBtn);
    const category1 = await screen.findByTestId(categoryID);
    expect(category1.innerHTML).toBe('Alcoholic');

    const allBtn = screen.getByTestId(allBtnID);
    userEvent.click(allBtn);
    const cards = await screen.findAllByTestId(cardID);
    expect(cards.length).toBe(2);
  });

  it('Verifica se ao clicar na imagem ou nome, a pagina é redirecionada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const image1 = await screen.findByTestId('0-horizontal-image');
    userEvent.click(image1);
    expect(history.location.pathname).toBe('/comidas/52771');

    history.push(url);

    const image2 = await screen.findByTestId('1-horizontal-image');
    userEvent.click(image2);
    expect(history.location.pathname).toBe('/bebidas/178319');

    history.push(url);

    const title1 = await screen.findByTestId('0-horizontal-name');
    userEvent.click(title1);
    expect(history.location.pathname).toBe('/comidas/52771');

    history.push(url);

    const title2 = await screen.findByTestId('1-horizontal-name');
    userEvent.click(title2);
    expect(history.location.pathname).toBe('/bebidas/178319');
  });

  it('Verifica se ao clicar no botão de compartilhar, a função é chamda', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn1);
    expect(copyToClipBoard).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao clicar no botão de favoritos, a receita é desfavoritada',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(url);
      const favoritesBefore = JSON.parse(localStorage.getItem('favoriteRecipes'));

      expect(favoritesBefore.length).toBe(2);

      const favoriteBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');
      userEvent.click(favoriteBtn1);

      const favoritesAfter = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const cards = await screen.findAllByTestId(cardID);

      expect(cards.length).toBe(1);
      expect(favoritesAfter.length).toBe(1);
    });
});
