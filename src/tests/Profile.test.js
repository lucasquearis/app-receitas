import React from 'react';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from '../services/renderWithRouter';

const DATA_TEST_ID_DONE_RECIPE = 'profile-done-btn';
const DATA_TEST_ID_FAV_RECIPE = 'profile-favorite-btn';
const DATA_TEST_ID_LOGOUT = 'profile-logout-btn';
const DATA_TEST_ID_EMAIL = 'profile-email';

describe('Verifica ids em elementos do Perfil', () => {
  beforeEach(() => {
    renderWithRouter(<Profile />);
  });

  afterEach(cleanup);

  it('Verifica id do botão "Receitas Feitas"', () => {
    const button = screen.getByTestId(DATA_TEST_ID_DONE_RECIPE);
    expect(button).toBeInTheDocument();
  });

  it('Verifica id do botão "Receitas Favoridas"', () => {
    const button = screen.getByTestId(DATA_TEST_ID_FAV_RECIPE);
    expect(button).toBeInTheDocument();
  });

  it('Verifica id do botão "Receitas Feitas"', () => {
    const button = screen.getByTestId(DATA_TEST_ID_LOGOUT);
    expect(button).toBeInTheDocument();
  });
});

describe('Varifica informações do LocalStorage', () => {
  beforeEach(() => {
    renderWithRouter(<Profile />);
  });

  afterEach(cleanup);

  it('Varifica se email armazenado no localStorage é renderizado na tela', () => {
    const email = screen.getByTestId(DATA_TEST_ID_EMAIL);
    expect(email).toBeInTheDocument();
    expect(email).toBeVisible();
  });
});

describe('Varifica alteração das rotas ao clicar em botões', () => {
  it('Verifica rota para Receitas Favoritas', () => {
    const { history } = renderWithRouter(<Profile />);
    const FavButton = screen.getByTestId(DATA_TEST_ID_FAV_RECIPE);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(FavButton);

    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Verifica rota para Receitas Feitas', () => {
    const { history } = renderWithRouter(<Profile />);
    const DoneButton = screen.getByTestId(DATA_TEST_ID_DONE_RECIPE);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(DoneButton);

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Verifica rota para tela de login', () => {
    const { history } = renderWithRouter(<Profile />);
    const LogoutButton = screen.getByTestId(DATA_TEST_ID_LOGOUT);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(LogoutButton);

    expect(history.location.pathname).toBe('/');
  });
});
