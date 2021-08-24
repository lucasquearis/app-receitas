import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

const mealApiResponse = Promise.resolve({
  json: () => Promise.resolve(mealsByIngredient),
});

afterEach(() => jest.clearAllMocks());

describe('Testa SearchBar', () => {
  const mockedMeals = jest.spyOn(global, 'fetch')
    .mockImplementation(() => mealApiResponse);
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  it('Should have search form', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(mockedMeals).toBeCalledWith(endpoint);
    const searchTopBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchRadioName = screen.getByTestId('name-search-radio');
    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchRadioLetter = screen.getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(searchRadioName).toBeInTheDocument();
    expect(searchRadioIngredient).toBeInTheDocument();
    expect(searchRadioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Test input and radio buttons', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchTopBtn = await screen.findByTestId('search-top-btn');
    expect(mockedMeals).toBeCalledWith(endpoint);

    fireEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    // const searchRadioName = screen.getByTestId('name-search-radio');
    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    // const searchRadioLetter = screen.getByTestId('first-letter-search-radio');

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(searchRadioIngredient);
    fireEvent.click(searchBtn);

    const searchResult = await screen.findByTestId('0-card-name');

    expect(searchResult).toHaveTextContent(/Brown Stew Chicken/);
  });
});
