import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Perfil from '../pages/Perfil';

describe('Testes para o Perfil', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
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
    let user = JSON.parse(localStorage.getItem('user'));
    let mealsToken = localStorage.getItem('mealsToken');
    let cocktailsToken = localStorage.getItem('cocktailsToken');
    let doneRecipes = localStorage.getItem('doneRecipes');
    let favoriteRecipes = localStorage.getItem('favoriteRecipes');
    let inProgressRecipes = localStorage.getItem('inProgressRecipes');

    expect(user).toStrictEqual({ email: 'email@mail.com' });
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(doneRecipes).toBe('[]');
    expect(favoriteRecipes).toBe('[]');
    expect(inProgressRecipes).toBe('{}');

    userEvent.click(sair);
    const { location: { pathname } } = history;

    user = JSON.parse(localStorage.getItem('user'));
    mealsToken = localStorage.getItem('mealsToken');
    cocktailsToken = localStorage.getItem('cocktailsToken');
    doneRecipes = localStorage.getItem('doneRecipes');
    favoriteRecipes = localStorage.getItem('favoriteRecipes');
    inProgressRecipes = localStorage.getItem('inProgressRecipes');

    expect(pathname).toBe('/');
    expect(user).toBeNull();
    expect(mealsToken).toBeNull();
    expect(cocktailsToken).toBeNull();
    expect(doneRecipes).toBeNull();
    expect(favoriteRecipes).toBeNull();
    expect(inProgressRecipes).toBeNull();
  });
});
