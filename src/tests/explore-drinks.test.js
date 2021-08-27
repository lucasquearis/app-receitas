import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import {
  buttonId,
  exploreButtonId,
  exploreByArea,
  exploreByIngredient,
  exploreBySurprise,
  exploreDrinksId,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './helpers/mocks';
import renderWithRouter from './helpers/renderWithRouter';

let currentHistory;

beforeAll(() => {
  const { history } = renderWithRouter(<App />);
  loginSteps(VALID_EMAIL, VALID_PASSWORD);
  const loginButton = screen.getByTestId(buttonId);
  userEvent.click(loginButton);
  userEvent.click(exploreButtonId);
  currentHistory = history;
});

describe('Tests rendering of explore drinks page', () => {
  beforeAll(() => {
    userEvent.click(screen.getByTestId(exploreDrinksId));
  });

  it('Should render an element with text testid "explore-by-ingredient"', () => {
    const exploreByIngredientBtn = screen.getByTestId(exploreByIngredient);
    expect(exploreByIngredientBtn).toBeInTheDocument();

    it('Element should have text "Por Ingredientes"', () => {
      expect(exploreByIngredientBtn).toHaveTextContent('Por Ingredientes');
    });
  });

  it('Should render an element with testid "explore-by-area"', () => {
    const exploreByAreaBtn = screen.getByTestId(exploreByArea);
    expect(exploreByAreaBtn).toBeInTheDocument();

    it('Element should have text "Por Local de Origem"', () => {
      expect(exploreByAreaBtn).toHaveTextContent('Por Local de Origem');
    });
  });

  it('Should render an element with testid "explore-by-surprise"', () => {
    const exploreBySurpriseBtn = screen.getByTestId(exploreBySurprise);
    expect(exploreBySurpriseBtn).toBeInTheDocument();

    it('Element should have text "Me Surpreenda!"', () => {
      expect(exploreBySurpriseBtn).toHaveTextContent('Me Surpreenda!');
    });
  });
});

describe('Tests routing of buttons on explore drinks page', () => {
  beforeAll(() => {
    userEvent.click(screen.getByTestId(exploreDrinksId));
  });

  it('"Por Ingrediente" should redirect to "/explorar/bebidas/ingredientes"', () => {
    userEvent.click(screen.getByTestId(exploreByIngredient));
    expect(currentHistory.location.pathname).toEqual('/explorar/bebidas/ingredientes');
  });

  it('"Por Local de Origem" should redirect to /explorar/bebidas/area"', () => {
    userEvent.click(screen.getByTestId(exploreByArea));
    expect(currentHistory.location.pathname).toEqual('/explorar/bebidas/area');
  });
});
