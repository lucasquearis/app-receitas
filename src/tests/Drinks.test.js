import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import {
  drinksMockFetch,
  changeDrinksCategoryMockFetch,
  changeDrinksTwiceMockFetch,
  justDrinkTwiceMockFetch,
} from './helpers/mockedFetchs';
import Drinks from '../pages/Drinks';

const DRINKS_CARDS = 12;
const CATEGORY_OPTIONS = [
  'All',
  'Ordinary Drink',
  'Cocktail',
  'Milk / Float / Shake',
  'Other/Unknown',
  'Cocoa',
];
const FIRST_CARD = '0-card-name';
const SECOND_CARD = '1-recipe-card';

describe('Testa a página principal de Bebidas', () => {
  beforeEach(() => jest.clearAllMocks());

  drinksMockFetch();
  it('São feitas duas requisições/chamadas para a API', async () => {
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  drinksMockFetch();
  it('Exibe as 5 opções de categorias de bebidas e uma opção para todas', async () => {
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    await CATEGORY_OPTIONS.forEach((category) => {
      const categoryButton = screen.getByTestId(`${category}-category-filter`);
      expect(categoryButton).toBeInTheDocument();
    });
  });

  drinksMockFetch();
  it('Exibe os 12 primeiros resultados de receitas de bebidas', async () => {
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    for (let index = 0; index < DRINKS_CARDS; index += 1) {
      const drinkCard = screen.getByTestId(`${index}-recipe-card`);
      expect(drinkCard).toBeInTheDocument();
    }
  });

  drinksMockFetch();
  it('Exibe a imagem e nome de cada uma das 12 receitas de bebidas', async () => {
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    for (let index = 0; index < DRINKS_CARDS; index += 1) {
      const drinkThumb = screen.getByTestId(`${index}-card-img`);
      const drinkName = screen.getByTestId(`${index}-card-name`);
      expect(drinkThumb).toBeInTheDocument();
      expect(drinkName).toBeInTheDocument();
    }
  });

  changeDrinksCategoryMockFetch();
  it('Quando clica em uma opção de filtro por categoria, os cards mudam', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    for (let index = 0; index < DRINKS_CARDS; index += 1) {
      const drinkCard = screen.getByTestId(`${index}-recipe-card`);
      expect(drinkCard).toBeInTheDocument();
    }

    const tenthCard = screen.getByTestId('9-recipe-card');
    expect(tenthCard).toBeInTheDocument();

    const lastButton = await screen.getByRole('button', { name: /Cocoa/i });
    expect(lastButton).toBeInTheDocument();
    userEvent.click(lastButton);

    await act(() => promise);

    const firstCard = await screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent('Castillian Hot Chocolate');

    expect(tenthCard).not.toBeInTheDocument();
  });

  changeDrinksTwiceMockFetch();
  it('Quando clica em uma opção de filtro por categoria duas vezes, volta para o cenário'
      + 'inicial com cards de todas as categorias', async () => {
    const firstPromise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    let firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('GG');

    let secondCard = screen.getByTestId(SECOND_CARD);
    expect(secondCard).toBeInTheDocument();

    const lastButton = await screen.getByRole('button', { name: /Cocoa/i });
    expect(lastButton).toBeInTheDocument();
    userEvent.click(lastButton);

    await act(() => firstPromise);
    const secondPromise = Promise.resolve();

    firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('Castillian Hot Chocolate');

    expect(secondCard).not.toBeInTheDocument();

    userEvent.click(lastButton);

    await act(() => secondPromise);

    firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('GG');
    secondCard = screen.getByTestId(SECOND_CARD);
    expect(secondCard).toBeInTheDocument();
  });

  justDrinkTwiceMockFetch();
  it('Quando clica na opção de filtro All, devem ser exibidos as 12 primeiras receitas'
      + 'de bebida retornadas pela API', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Drinks />);
    });

    for (let index = 0; index < DRINKS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }

    const firstButton = await screen.getByRole('button', { name: /All/i });
    expect(firstButton).toBeInTheDocument();
    userEvent.click(firstButton);

    await act(() => promise);

    for (let index = 0; index < DRINKS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }
  });

  drinksMockFetch();
  it('Quando clica em um card de receita de bebida, é redirecionado para pagina de'
      + 'detalhes da receita', async () => {
    let myHistory = {};

    await act(async () => {
      const { history } = renderWithRouter(<Drinks />);
      myHistory = history;
    });

    const firstRecipe = await screen.getByTestId('0-recipe-card');
    userEvent.click(firstRecipe);

    const url = myHistory.location.pathname;
    expect(url).toBe('/bebidas/15997');
  });
});
