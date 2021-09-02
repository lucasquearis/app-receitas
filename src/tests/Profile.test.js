import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

const PAGE_TITLE = 'page-title';

describe('Testa Pagina De Perfil!', () => {
  it('Testa se Pagina de perfil existe', () => {
    renderWithRouter(<Profile />);
    const profile = screen.getByTestId(PAGE_TITLE);
    expect(profile).toBeInTheDocument();
  });

  it('Testa se os botoes existem', () => {
    renderWithRouter(<Profile />);
    const buttonReceitasFeitas = screen.getByTestId('profile-done-btn');
    const buttonReceitasFavoritas = screen.getByTestId('profile-favorite-btn');
    const buttonSair = screen.getByTestId('profile-logout-btn');
    expect(buttonReceitasFeitas).toBeInTheDocument();
    expect(buttonReceitasFavoritas).toBeInTheDocument();
    expect(buttonSair).toBeInTheDocument();
  });

  it('Testa se a rota esta correta', () => {
    const { history } = renderWithRouter(<Profile />, '/perfil');
    const path = history.location.pathname;
    expect(path).toBe('/perfil');
  });

  it('Testa userName', () => {
    renderWithRouter(<Profile />, '/perfil');
    const UserName = screen.getByTestId('profile-email');
    expect(UserName).toBeInTheDocument();
  });

  it('Testa logo de perfil', () => {
    renderWithRouter(<Profile />, '/perfil');
    const icon = screen.getByTestId('profile-top-btn');
    expect(icon).toBeInTheDocument();
  });
  it('Testa menu inferior', () => {
    renderWithRouter(<Profile />, '/perfil');
    const drinkLink = screen.getByTestId('drinks-bottom-btn');
    const foodLink = screen.getByTestId('food-bottom-btn');
    const exploreLink = screen.getByTestId('explore-bottom-btn');
    expect(drinkLink).toBeInTheDocument();
    expect(foodLink).toBeInTheDocument();
    expect(exploreLink).toBeInTheDocument();
  });
});
