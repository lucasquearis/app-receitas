import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { categoriesResponse, mealsResponse, categoryResponse } from './mocks/mealsMock';
import Meals from '../pages/Meals';

const MEALS_CARDS = 12;
const CATEGORY_OPTIONS = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const FIRST_CARD = '0-card-name';
const SECOND_CARD = '1-recipe-card';

const justMealMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsResponse),
    }));
};

const mealsMockFetch = () => {
  justMealMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(categoriesResponse),
    }));
};

const changeCategoryMockFetch = () => {
  mealsMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(categoryResponse),
    }));
};

const changeTwiceMockFetch = () => {
  changeCategoryMockFetch();
  justMealMockFetch();
};

const justMealTwiceMockFetch = () => {
  mealsMockFetch();
  justMealMockFetch();
};

describe('Testa a página principal de Comidas', () => {
  beforeEach(() => jest.clearAllMocks());

  mealsMockFetch();
  it('São feitas duas requisições/chamadas para a API', async () => {
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  mealsMockFetch();
  it('Exibe as 5 opções de categorias de comidas e uma opção para todas', async () => {
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    await CATEGORY_OPTIONS.forEach((category) => {
      const categoryButton = screen.getByTestId(`${category}-category-filter`);
      expect(categoryButton).toBeInTheDocument();
    });
  });

  mealsMockFetch();
  it('Exibe os 12 primeiros resultados de receitas de comida', async () => {
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    for (let index = 0; index < MEALS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }
  });

  mealsMockFetch();
  it('Exibe a imagem e nome de cada uma das 12 receitas de comida', async () => {
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    for (let index = 0; index < MEALS_CARDS; index += 1) {
      const mealThumb = screen.getByTestId(`${index}-card-img`);
      const mealName = screen.getByTestId(`${index}-card-name`);
      expect(mealThumb).toBeInTheDocument();
      expect(mealName).toBeInTheDocument();
    }
  });

  changeCategoryMockFetch();
  it('Quando clica em uma opção de filtro por categoria, os cards mudam', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    for (let index = 0; index < MEALS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }

    const secondCard = screen.getByTestId(SECOND_CARD);
    expect(secondCard).toBeInTheDocument();

    const lastButton = await screen.getByRole('button', { name: /Goat/i });
    expect(lastButton).toBeInTheDocument();
    userEvent.click(lastButton);

    await act(() => promise);

    const firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('Mbuzi Choma (Roasted Goat)');

    expect(secondCard).not.toBeInTheDocument();
  });

  changeTwiceMockFetch();
  it('Quando clica na mesma opção de filtro por categoria duas vezes, volta para o'
      + 'cenário inicial com cards de todas as categorias', async () => {
    const firstPromise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    let firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('Corba');

    let secondCard = screen.getByTestId(SECOND_CARD);
    expect(secondCard).toBeInTheDocument();

    const lastButton = await screen.getByRole('button', { name: /Goat/i });
    expect(lastButton).toBeInTheDocument();
    userEvent.click(lastButton);

    await act(() => firstPromise);
    const secondPromise = Promise.resolve();

    firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('Mbuzi Choma (Roasted Goat)');

    expect(secondCard).not.toBeInTheDocument();

    userEvent.click(lastButton);

    await act(() => secondPromise);

    firstCard = await screen.getByTestId(FIRST_CARD);
    expect(firstCard).toHaveTextContent('Corba');
    secondCard = screen.getByTestId(SECOND_CARD);
    expect(secondCard).toBeInTheDocument();
  });

  justMealTwiceMockFetch();
  it('Quando clica na opção de filtro All, devem ser exibidos as 12 primeiras receitas'
      + 'de comida retornadas pela API', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<Meals />);
    });

    for (let index = 0; index < MEALS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }

    const firstButton = await screen.getByRole('button', { name: /All/i });
    expect(firstButton).toBeInTheDocument();
    userEvent.click(firstButton);

    await act(() => promise);

    for (let index = 0; index < MEALS_CARDS; index += 1) {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    }
  });

  mealsMockFetch();
  it('Quando clica em um card de receita de comida, é redirecionado para pagina de'
      + 'detalhes da receita', async () => {
    let myHistory = {};

    await act(async () => {
      const { history } = renderWithRouter(<Meals />);
      myHistory = history;
    });

    const firstRecipe = await screen.getByTestId('0-recipe-card');
    userEvent.click(firstRecipe);

    const url = myHistory.location.pathname;
    expect(url).toBe('/comidas/52977');
  });
});
