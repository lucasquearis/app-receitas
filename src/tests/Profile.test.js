import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Perfil from '../pages/Perfil';

describe('Testes para o Perfil', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ "email": "email@mail.com" }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  });

  afterEach(() => {
    localStorage.clear();
  });
  
  it('Verifica se os elementos estao presentes', () => {
    renderWithRouter(<Perfil />);
    const email = screen.getByTestId(/profile-email/i);
    const receitasFeitas = screen.getByTestId(/profile-done-btn/i);
    const receitasFavoritas = screen.getByTestId(/profile-favorite-btn/i);
    const sair = screen.getByTestId(/profile-logout-btn/i);

    expect(email).toBeInTheDocument();
    expect(receitasFavoritas).toBeInTheDocument();
    expect(receitasFeitas).toBeInTheDocument();
    expect(sair).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botao receitas feitas vai a pagina correta', () => {
    const { history } = renderWithRouter(<Perfil />);
    const receitasFeitas = screen.getByTestId(/profile-done-btn/i);
    userEvent.click(receitasFeitas);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/receitas-feitas');
  });

  it('Verifica se ao clicar no botao receitas favoritas vai a pagina correta', () => {
    const { history } = renderWithRouter(<Perfil />);
    const receitasFavoritas = screen.getByTestId(/profile-favorite-btn/i);
    userEvent.click(receitasFavoritas);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/receitas-favoritas');
  });

  it('Verifica se ao clicar em sair vai a pagina correta e apaga local storage', () => {
    const { history } = renderWithRouter(<Perfil />);
    const sair = screen.getByTestId(/profile-logout-btn/i);
    const user = JSON.parse(localStorage.getItem('user'));

    expect(user).toStrictEqual({ email: 'email@mail.com' });

    userEvent.click(sair);
    const { location: { pathname } } = history;

    const newUser = JSON.parse(localStorage.getItem('user'));

    expect(pathname).toBe('/');
    expect(newUser).toBeNull();
  });
});
