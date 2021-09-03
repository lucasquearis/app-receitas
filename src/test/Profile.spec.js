import React from 'react';
import userEvent from '@testing-library/user-event';
import Perfil from '../pages/Perfil/Perfil';

describe('testa se a página Profile é renderizada', () => {
  test('testa se os botões são renderizados', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<Perfil />);

    const emailElement = getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const btnDoneRecipes = getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();

    const favoriteBtn = getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const btnlogout = getByTestId('profile-logout-btn');
    expect(btnlogout).toBeInTheDocument();
  });
});

describe('testa a rota depois de clicar nos botões', () => {
  test('testa o botão de Receitas Feitas', () => {
    const { getByTestId, history } = renderWithRouterAndBothContext(<Perfil />);
    const btnDoneRecipes = getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-feitas');
  });
  test('testa o botão de Receitas Favoritas', () => {
    const { getByTestId, history } = renderWithRouterAndBothContext(<Perfil />);
    const favoriteBtn = getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-favoritas');
  });
  test('testa o botão de Logout', () => {
    const { getByTestId, history } = renderWithRouterAndDataContext(<Perfil />);
    const btnLogout = getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
});
