import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

const categoriesApiResponse = Promise.resolve({
  json: () => Promise.resolve(mealCategories),
});

afterEach(() => jest.clearAllMocks());

describe('Test meals list', async () => {
  const mockedMeals = jest.spyOn(global, 'fetch')
    .mockImplementation(() => categoriesApiResponse);
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  it('Filter buttons should be in the screen', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(mockedMeals).toBeCalledWith(endpoint);
    const firstCategory = await screen.findByTestId('Beef-category-filter');
    const lastCategory = await screen.findByTestId('Goat-category-filter');
    expect(firstCategory).toBeInTheDocument();
    expect(lastCategory).toBeInTheDocument();
  });
});
