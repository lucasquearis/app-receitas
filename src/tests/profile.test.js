import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import loginSteps from './helpers/loginSteps';
import {
  buttonId,
  doneRecipesId,
  favoriteRecipesId,
  logoutButtonId,
  profileButtonId,
  profileEmailId,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './helpers/mocks';
import renderWithRouter from './helpers/renderWithRouter';

let currentHistory;
beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  loginSteps(VALID_EMAIL, VALID_PASSWORD);
  const loginButton = screen.getByTestId(buttonId);
  userEvent.click(loginButton);
  const profileButton = screen.getByTestId(profileButtonId);
  userEvent.click(profileButton);
  currentHistory = history;
});

describe('Tests profile route', () => {
  it('Route should be \'/perfil\'', () => {
    expect(currentHistory.location.pathname).toEqual('/perfil');
  });
});

describe('Tests correct rendering of email element with', () => {
  it('Should render element with data-testid="profile-email"', () => {
    expect(screen.getByTestId(profileEmailId)).toBeInTheDocument();
  });

  it('Element should have correct email', () => {
    const profileEmail = screen.getByTestId(profileEmailId);
    expect(profileEmail).toHaveTextContent(VALID_EMAIL);
  });
});

describe('Tests correct rendering of done recipes button element', () => {
  it('Should render element with data-testid="profile-done-btn"', () => {
    expect(screen.getByTestId(doneRecipesId)).toBeInTheDocument();
  });

  it('Element should have text value "Receitas Feitas"', () => {
    expect(screen.getByRole('button', { name: 'Receitas Feitas' })).toBeInTheDocument();
  });
});

describe('Tests correct rendering of favorite recipes button', () => {
  it('Should render element with data-testid="profile-favorite-btn"', () => {
    expect(screen.getByTestId(favoriteRecipesId)).toBeInTheDocument();
  });

  it('Element should have text value "Receitas Favoritas"', () => {
    expect(screen.getByRole('button', { name: 'Receitas Favoritas' }))
      .toBeInTheDocument();
  });
});

describe('Tests correct rendering of logout button', () => {
  it('Should render element with data-testid="profile-logout-btn"', () => {
    expect(screen.getByTestId(logoutButtonId)).toBeInTheDocument();
  });

  it('Element should have text value "Sair"', () => {
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();
  });
});
