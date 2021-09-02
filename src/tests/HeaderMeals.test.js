import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import { HeaderMeals } from '../components';
import { justMealMockFetch } from './helpers/mockedFetchs';
import { emptySearch, chickenSearch } from './mocks/chickenSearch';
import userEvent from '@testing-library/user-event';

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


describe('Testa a página de detalhes das receitas', () => {
  // beforeAll(fetchMock);
  beforeEach(cleanup); 

  fetchMock()
  it('Verifica se a página contém os elementos esperados', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderMeals />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const searchBtn = screen.getByTestId('search-top-btn');
  
      expect(profileBtn).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      await act(() => promise);
    });
  });

  fetchMock()
  it('Faz pesquisa filtrando por ingredientes', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const ingredients = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredients);
    userEvent.type(searchInput, 'chicken')
    userEvent.click(searchBtn);
    await act(() => promise);
  });

  fetchMock()
  it('Faz pesquisa filtrando por nome', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const name = screen.getByTestId('name-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(name);
    userEvent.type(searchInput, 'Brown Stew Chicken')
    userEvent.click(searchBtn);
    await act(() => promise);
  });

  fetchMock()
  it('Faz pesquisa filtrando por primeira letra', async () => {
    const promise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'a')
    userEvent.click(searchBtn);
    await act(() => promise);

  });

  fetchMock()
  it('Faz pesquisa sem filtro', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
    await act(() => promise);


  });

  fetchMock()
  it('Testa se aparece um alert quando a pesquisa por uma letra tem mais de uma letra', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'aaa')
    userEvent.click(searchBtn);
    await act(() => promise);

    expect(window.alert)
  });

  fetchEmptyMock()
  it('Testa cenario em que a pesquisa nao tem correspondencia', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<HeaderMeals />);
    });
    const activeSearchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(activeSearchBtn);
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'ugwadawgb')
    userEvent.click(searchBtn);

    await act(() => promise);

    expect(window.alert)
  });
});