import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { FavouriteRecipes } from '../pages';

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
  {
    id: '13938',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'AT&T',
    image: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
  },
];

const MOCK_FAV_FOODS = [
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
];
const MOCK_FAV_DRINKS = [
  {
    id: '17203',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  },
  {
    id: '13938',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'AT&T',
    image: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
  },
];

Object.assign(navigator, { clipboard: { writeText: () => {} } });

// const clipboardMock = () => jest.spyOn(navigator.clipboard, 'writeText');

jest.spyOn(navigator.clipboard, 'writeText');

describe('testa pagina de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_FAV_RECIPES));
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => localStorage.clear());

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
        screen.getAllByText(
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
      const five = 5;
      const four = 4;
      const three = 3;

      const recpCards = document.getElementsByClassName('fav-recipe-container');
      expect(recpCards.length).toBe(MOCK_FAV_RECIPES.length);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toEqual(five);

      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(five);

      userEvent.click(favBtn0);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(four);

      userEvent.click(favBtn1);
      expect(JSON.parse(localStorage.favoriteRecipes).length).toBe(three);
    });
  });

  it('compartilhar', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<FavouriteRecipes />);
    });

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    await act(() => firstPromise);

    await screen.findByText(/link copiado/i);

    const urlCopied = 'http://localhost:3000/comidas/52785';
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(urlCopied);
  });

  it('filtros comida', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<FavouriteRecipes />, PATH);
    });

    const allBtn = await screen.findByRole('button', { name: /All/i });
    const foodBtn = await screen.findByRole('button', { name: /Food/i });
    // const drinksBtn = await screen.findByRole('button', { name: /Drinks/i });

    userEvent.click(foodBtn);
    await act(() => firstPromise);

    MOCK_FAV_FOODS.forEach(
      ({ name }) => {
        screen.getByText(name);
      },
    );
  });

  it('filtros bebidas', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<FavouriteRecipes />, PATH);
    });

    // const allBtn = await screen.findByRole('button', { name: /All/i });
    // const foodBtn = await screen.findByRole('button', { name: /Food/i });
    const drinksBtn = await screen.findByRole('button', { name: /Drinks/i });

    userEvent.click(drinksBtn);
    await act(() => firstPromise);

    MOCK_FAV_DRINKS.forEach(
      ({ name }) => {
        screen.getByText(name);
      },
    );
  });

  it('filtros bebidas', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<FavouriteRecipes />, PATH);
    });

    const allBtn = await screen.findByRole('button', { name: /All/i });

    userEvent.click(allBtn);
    await act(() => firstPromise);

    MOCK_FAV_RECIPES.forEach(
      ({ name }) => {
        screen.getByText(name);
      },
    );
  });
});
