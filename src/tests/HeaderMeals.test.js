import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { HeaderMeals } from '../components';
import { emptySearch, chickenSearch } from './mocks/chickenSearch';

const fetchMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(chickenSearch),
  }));
};

const fetchEmptyMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(emptySearch),
  }));
};

const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Testa a página de detalhes das receitas', () => {
  beforeEach(cleanup);
  fetchMock();

  it('Verifica se a página contém os elementos esperados', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const btn = screen.getByTestId(SEARCH_BTN);

      expect(profileBtn).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
      await act(() => promise);
    });
  });

  fetchMock();
  it('Faz pesquisa filtrando por ingredientes', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(activeSearchBtn);
    const ingredients = screen.getByTestId('ingredient-search-radio');
    const input = screen.getByTestId(SEARCH_INPUT);
    const btn1 = screen.getByTestId(SEARCH_BTN);

    userEvent.click(ingredients);
    userEvent.type(input, 'chicken');
    userEvent.click(btn1);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa filtrando por nome', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const name = screen.getByTestId('name-search-radio');
    const inpt = screen.getByTestId(SEARCH_INPUT);
    const button = screen.getByTestId(SEARCH_BTN);

    userEvent.click(name);
    userEvent.type(inpt, 'Brown Stew Chicken');
    userEvent.click(button);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa filtrando por primeira letra', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const i = screen.getByTestId(SEARCH_INPUT);
    const b = screen.getByTestId(SEARCH_BTN);

    userEvent.click(firstLetter);
    userEvent.type(i, 'a');
    userEvent.click(b);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa sem filtro', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const b1 = screen.getByTestId(SEARCH_BTN);
    userEvent.click(b1);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa com mais de uma letra com o filtro de uma letra', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const input1 = screen.getByTestId(SEARCH_INPUT);
    const btn2 = screen.getByTestId(SEARCH_BTN);

    userEvent.click(firstLetter);
    userEvent.type(input1, 'aaa');
    userEvent.click(btn2);
    await act(() => promise);

    expect(window.alert);
  });

  fetchEmptyMock();
  it('Testa cenario em que a pesquisa nao tem correspondencia', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const inpu80 = screen.getByTestId(SEARCH_INPUT);
    const btn3 = screen.getByTestId(SEARCH_BTN);

    userEvent.click(firstLetter);
    userEvent.type(inpu80, 'ugwadawgb');
    userEvent.click(btn3);

    await act(() => promise);

    expect(window.alert);
  });
});
