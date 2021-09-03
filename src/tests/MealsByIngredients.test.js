import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { MealsByIngredients } from '../pages';
import { justDrinkMockFetch } from './helpers/mockedFetchs';

describe('Testa a página de receitas feitas', () => {
  beforeEach(() => jest.clearAllMocks());

  justDrinkMockFetch();
  it('Verifica se a página contém os elementos esperados', async () => {
    await act(async () => {
      renderWithRouter(<MealsByIngredients />);
    });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });
});
