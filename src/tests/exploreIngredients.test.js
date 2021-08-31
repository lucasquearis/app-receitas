import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';

const TWELVE = 12;

describe('Testa tela de explorar comidas por ingredientes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
    renderWithReduxAndRouter(<App />, {}, { route: '/explorar/comidas/ingredientes' });
  });

  it('Tem os data-testids corretos para a tela de explorar comidas por ingredientes',
    () => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      mealIngredients.meals.slice(0, TWELVE).forEach((_ingredient, index) => {
        const mealCard = screen.getByTestId(`${index}-ingredient-card`);
        const cardImg = screen.getByTestId(`${index}-card-img`);
        const cardName = screen.getByTestId(`${index}-card-name`);
        expect(mealCard).toBeInTheDocument();
        expect(cardImg).toBeInTheDocument();
        expect(cardName).toBeInTheDocument();
      });
      const basil = screen.queryByText('Basil');
      expect(basil).not.toBeInTheDocument();
      const mealCard0 = screen.getByTestId('0-ingredient-card');
      fireEvent.click(mealCard0);
    });

  it('Tem o nome e a foto corretos para a tela de explorar comidas por ingredientes',
    () => {
      mealIngredients.meals.slice(0, TWELVE)
        .forEach(({ strIngredient }, index) => {
          const cardImg = screen.getByTestId(`${index}-card-img`);
          const cardName = screen.getByTestId(`${index}-card-name`);
          const ingredient = strIngredient.replace(/ /g, '%20');
          expect(cardImg).toHaveAttribute('src');
          expect(cardImg.src).toContain(`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`);
          expect(cardName.innerHTML).toBe(strIngredient);
        });
    });
});

describe('Testa tela de explorar bebidas por ingredientes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
    renderWithReduxAndRouter(<App />, {}, { route: '/explorar/bebidas/ingredientes' });
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas por ingredientes',
    () => {
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      drinkIngredients.drinks.slice(0, TWELVE).forEach((_ingredient, index) => {
        const drinkCard = screen.getByTestId(`${index}-ingredient-card`);
        const cardImg = screen.getByTestId(`${index}-card-img`);
        const cardName = screen.getByTestId(`${index}-card-name`);
        expect(drinkCard).toBeInTheDocument();
        expect(cardImg).toBeInTheDocument();
        expect(cardName).toBeInTheDocument();
      });
      const lemonVodka = screen.queryByText('Lemon vodka');
      expect(lemonVodka).not.toBeInTheDocument();
    });

  it('Tem o nome e a foto corretos para a tela de explorar bebidas por ingredientes',
    () => {
      drinkIngredients.drinks.slice(0, TWELVE)
        .forEach(({ strIngredient1 }, index) => {
          const cardImg = screen.getByTestId(`${index}-card-img`);
          const cardName = screen.getByTestId(`${index}-card-name`);
          const ingredient = strIngredient1.replace(/ /g, '%20');
          expect(cardImg).toHaveAttribute('src');
          expect(cardImg.src).toContain(`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`);
          expect(cardName.innerHTML).toBe(strIngredient1);
        });
    });
});
