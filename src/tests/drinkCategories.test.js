import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import drinkCategories from '../../cypress/mocks/drinkCategories';

const categoriesApiResponse = Promise.resolve({
  json: () => Promise.resolve(drinkCategories),
});

afterEach(() => jest.clearAllMocks());

describe('Test meals filters', async () => {
  const mockedMeals = jest.spyOn(global, 'fetch')
    .mockImplementation(() => categoriesApiResponse);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  it('Filter buttons should be in the screen', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    expect(mockedMeals).toBeCalledWith(endpoint);

    const firstCategory = await screen.findByTestId('Cocktail-category-filter');
    const lastCategory = await screen.findByTestId('Cocoa-category-filter');

    expect(firstCategory).toBeInTheDocument();
    expect(lastCategory).toBeInTheDocument();
  });
});
