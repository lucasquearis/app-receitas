import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

const drinksApiResponse = Promise.resolve({
  json: () => Promise.resolve(drinks),
});

afterEach(() => jest.clearAllMocks());

describe('Test meals list', async () => {
  const mockedDrinks = jest.spyOn(global, 'fetch')
    .mockImplementation(() => drinksApiResponse);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  it('Should have 12 items', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    expect(mockedDrinks).toBeCalledWith(endpoint);
    const firstRecipe = await screen.findByTestId('0-recipe-card');
    const lastRecipe = await screen.findByTestId('11-recipe-card');
    expect(firstRecipe).toBeInTheDocument();
    expect(lastRecipe).toBeInTheDocument();
  });
  it('First item must be "GG"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const firstItemTitle = await screen.findAllByRole('heading');
    expect(firstItemTitle[1]).toHaveTextContent('GG');
  });
});
