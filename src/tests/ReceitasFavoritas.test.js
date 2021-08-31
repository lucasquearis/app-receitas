import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const url = '/receitas-favoritas';

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

    const cards = await screen.findAllByTestId('favorite-card');

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
    expect(favoriteBtn2).toBeDefined();
  });
});
