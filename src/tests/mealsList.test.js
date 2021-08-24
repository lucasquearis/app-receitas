import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const mealApiResponse = Promise.resolve({
  json: () => Promise.resolve(meals),
});

afterEach(() => jest.clearAllMocks());

describe('Test meals list', async () => {
  const mockedMeals = jest.spyOn(global, 'fetch')
    .mockImplementation(() => mealApiResponse);
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  it('Should have 12 items', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(mockedMeals).toBeCalledWith(endpoint);
    const firstRecipe = screen.findByTestId('0-recipe-card');
    const lastRecipe = screen.findByTestId('11-recipe-card');
    expect(firstRecipe).toBeDefined();
    expect(lastRecipe).toBeDefined();
  });
  it('First item must be "Corba"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const firstItemTitle = await screen.findAllByRole('heading');
    expect(firstItemTitle[1]).toHaveTextContent('Corba');
  });
  it('First item thumb must be Corba\'s thumbnail', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const firstItemImg = await screen.findByTestId('0-card-img');
    expect(firstItemImg.src).toBe(meals.meals[0].strMealThumb);
  });
});
