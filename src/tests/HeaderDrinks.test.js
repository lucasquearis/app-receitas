import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { HeaderDrinks } from '../components';
import { bananaSearch, emptySearch } from './mocks/bananaSearch';

const fetchMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(bananaSearch),
  }));
};

const fetchEmptyMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(emptySearch),
  }));
};

const SEARCH_INPUT = 'search-input';
const FIRST_LETTER = 'first-letter-search-radio';
const SEARCH_BUTTON = 'search-top-btn';
const EXEC_BUTTON = 'exec-search-btn';

describe('Testa a página de detalhes das receitas', () => {
  beforeEach(cleanup);
  fetchMock();
  it('Verifica se a página contém os elementos esperados', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const searchBtn1 = screen.getByTestId(SEARCH_BUTTON);

      expect(profileBtn).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(searchBtn1).toBeInTheDocument();
      await act(() => promise);
    });
  });

  fetchMock();
  it('Faz pesquisa filtrando por ingredientes', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const ingredients = screen.getByTestId('ingredient-search-radio');
    const searchInput5 = screen.getByTestId(SEARCH_INPUT);
    const searchBtn2 = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(ingredients);
    userEvent.type(searchInput5, 'chicken');
    userEvent.click(searchBtn2);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa filtrando por nome', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const name = screen.getByTestId('name-search-radio');
    const searchInput4 = screen.getByTestId(SEARCH_INPUT);
    const searchBtn1 = screen.getByTestId(EXEC_BUTTON);

    userEvent.click(name);
    userEvent.type(searchInput4, 'Brown Stew Chicken');
    userEvent.click(searchBtn1);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa filtrando por primeira letra', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const firstLetter3 = screen.getByTestId(FIRST_LETTER);
    const searchInput3 = screen.getByTestId(SEARCH_INPUT);
    const searchBtn2 = screen.getByTestId(EXEC_BUTTON);

    userEvent.click(firstLetter3);
    userEvent.type(searchInput3, 'a');
    userEvent.click(searchBtn2);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa sem filtro', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const searchBtn3 = screen.getByTestId(EXEC_BUTTON);
    userEvent.click(searchBtn3);
    await act(() => promise);
  });

  fetchMock();
  it('Faz pesquisa com mais de uma letra com o filtro de uma letra', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const firstLetter2 = screen.getByTestId(FIRST_LETTER);
    const searchInput2 = screen.getByTestId(SEARCH_INPUT);
    const searchBtn4 = screen.getByTestId(EXEC_BUTTON);

    userEvent.click(firstLetter2);
    userEvent.type(searchInput2, 'aaa');
    userEvent.click(searchBtn4);
    await act(() => promise);

    expect(window.alert);
  });

  fetchEmptyMock();
  it('Testa cenario em que a pesquisa nao tem correspondencia', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderDrinks />);
    });
    const activeSearchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(activeSearchBtn);
    const firstLetter1 = screen.getByTestId(FIRST_LETTER);
    const searchInput1 = screen.getByTestId(SEARCH_INPUT);
    const searchBtn5 = screen.getByTestId(EXEC_BUTTON);

    userEvent.click(firstLetter1);
    userEvent.type(searchInput1, 'ugwadawgb');
    userEvent.click(searchBtn5);

    await act(() => promise);

    expect(window.alert);
  });
});
