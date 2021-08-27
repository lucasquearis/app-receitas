import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  history.push('/comidas/52977/in-progress');
});

describe('Test in progess recipes screen', () => {
  it('Should have the correct recipe details', async () => {
    const recipeName = await screen.findByTestId('recipe-title');
    const recipeImg = await screen.findByTestId('recipe-photo');
    const firstIng = await screen.findByTestId('0-ingredient-step');
    const lastIng = await screen.findByTestId('12-ingredient-step');

    expect(recipeName).toHaveTextContent('Corba');
    expect(recipeImg.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(firstIng).toHaveTextContent('Lentils');
    expect(lastIng).toHaveTextContent('Sea Salt');
  });

  it('Test checkboxes', async () => {
    const checkboxes = await screen.findAllByRole('checkbox');
    const doneRecipesBtn = await screen.findByTestId('finish-recipe-btn');
    const ingredientsQtt = 13;
    expect(doneRecipesBtn).toHaveAttribute('disabled');
    checkboxes.forEach((checkbox) => fireEvent.click(checkbox));
    expect(checkboxes.length).toBe(ingredientsQtt);
    expect(doneRecipesBtn).not.toHaveAttribute('disabled');
  });
  it('Test done recipes button', async () => {
    const checkboxes = await screen.findAllByRole('checkbox');
    const doneRecipesBtn = await screen.findByTestId('finish-recipe-btn');
    checkboxes.forEach((checkbox) => fireEvent.click(checkbox));
    fireEvent.click(doneRecipesBtn);
    expect(doneRecipesBtn).not.toBeInTheDocument();
  });
});
