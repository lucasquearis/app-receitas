import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const PATH = '/receitas-favoritas';
const MOCK_FAV_RECIPES = [
  {
    id: '52785',
    type: 'comida',
    area: 'Indian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Dal fry',
    image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
  },
  {
    id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '53013',
    type: 'comida',
    area: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
  {
    id: '17203',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  },
];

describe('testa pagina de receitas favoritas', () => {
  // beforeAll(fetchMock);
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_FAV_RECIPES));
    jest.clearAllMocks();
  });

  afterEach(() => localStorage.clear());
  beforeEach(cleanup);

  it('path da pagina', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />, PATH);
      expect(history.location.pathname).toBe(PATH);
    });
  });

  it('elementos da pagina', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
      localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_FAV_RECIPES));
    });

    await screen.findByRole('heading', { name: /Receitas Favoritas/i });
    await screen.findByRole('button', { name: /Food/i });
    await screen.findByRole('button', { name: /Drinks/i });

    const recpCards = document.getElementsByClassName('fav-recipe-container');
    expect(recpCards.length).toBe(MOCK_FAV_RECIPES.length);

    MOCK_FAV_RECIPES.forEach(
      ({ name, type, area, category, alcoholicOrNot, image }, i) => {
        screen.getByText(name);
        screen.getByText(
          `${type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`}`,
        );
        screen.findByRole('img', { src: `${image}` });
        screen.findByRole('img', { src: `${image}` });
        screen.getByTestId(`${i}-horizontal-share-btn`);
        screen.getByTestId(`${i}-horizontal-favorite-btn`);
      },
    );
  });

  it('botao de favoritar', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
      localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_FAV_RECIPES));
      const favBtn0 = await screen.findByTestId('0-horizontal-favorite-btn');
      const favBtn1 = await screen.findByTestId('1-horizontal-favorite-btn');
      const four = 4;
      const three = 3;
      const two = 2;

      const recpCards = document.getElementsByClassName('fav-recipe-container');
      expect(recpCards.length).toBe(MOCK_FAV_RECIPES.length);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toEqual(four);
      console.log(recpCards);

      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(four);

      userEvent.click(favBtn0);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(three);

      userEvent.click(favBtn1);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(two);
    });
  });
});
