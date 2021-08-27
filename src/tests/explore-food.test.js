import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import loginSteps from './helpers/loginSteps';
import {
  buttonId,
  exploreButtonId,
  exploreByArea,
  exploreByIngredient,
  exploreBySurprise,
  exploreFoodId,
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

describe('Tests rendering of explore food page', () => {
  beforeAll(() => {
    userEvent.click(screen.getByTestId(exploreFoodId));
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

describe('Tests routing of buttons on explore food page', () => {
  beforeAll(() => {
    userEvent.click(screen.getByTestId(exploreFoodId));
  });

  it('"Por Ingrediente" should redirect to "/explorar/comidas/ingredientes"', () => {
    userEvent.click(screen.getByTestId(exploreByIngredient));
    expect(currentHistory.location.pathname).toEqual('/explorar/comidas/ingredientes');
  });

  it('"Por Local de Origem" should redirect to /explorar/comidas/area"', () => {
    userEvent.click(screen.getByTestId(exploreByArea));
    expect(currentHistory.location.pathname).toEqual('/explorar/comidas/area');
  });
});
