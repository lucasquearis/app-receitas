import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

const drinksApiResponse = Promise.resolve({
  json: () => Promise.resolve(drinks),
});

// const mockedDrinks = jest.spyOn(global, 'fetch')
//   .mockImplementation(() => drinksApiResponse);

afterEach(() => jest.clearAllMocks());

describe('Test meals list', async () => {
  const mockedDrinks = jest.spyOn(global, 'fetch')
    .mockImplementation(() => drinksApiResponse);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  it('Should have 12 items', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    expect(mockedDrinks).toBeCalledWith(endpoint);
    // const recipes = await screen.findAllByTestId('recipe-card');
    const firstRecipe = screen.findByTestId('0-recipe-card');
    const lastRecipe = screen.findByTestId('11-recipe-card');
    expect(firstRecipe).toBeDefined();
    expect(lastRecipe).toBeDefined();
  });
  it('First item must be "GG"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const firstItemTitle = await screen.findAllByRole('heading');
    expect(firstItemTitle[1]).toHaveTextContent('GG');
  });
  it('First item thumb must be GG\'s thumbnail', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const firstItemImg = await screen.findByTestId('0-card-img');
    expect(firstItemImg.src).toBe(drinks.drinks[0].strDrinkThumb);
  });
});
