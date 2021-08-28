import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock from '../mocks/fecthMock';

// const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

global.fetch = jest.fn(fetchMock);

afterEach(() => jest.clearAllMocks());

describe('verifica a renderização e o funcionamento componente SearchBar', () => {
  it('verifica se todos componentes são renderizados', () => {
    renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId('search-input');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioLetter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('verifica busca por nome na pagina de comidas', async () => {
    const { store } = renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const { comidas } = store.getState().reducerComidas;

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'Soup' } });
    expect(searchInput).toHaveValue('Soup');
    fireEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    // console.log(store.getState());
    console.log(comidas);
  });
});
