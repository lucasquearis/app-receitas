import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import Foods from '../pages/Foods';
import App from '../App';
import { renderWithRouterAndStore } from './testConfig';

afterEach(() => jest.clearAllMocks());

describe('9 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', () => {
  test('Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    renderWithRouterAndStore(<Foods />, '/comidas');
    const topbtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchbtn = screen.getByTestId('search-top-btn');

    expect(topbtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchbtn).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', () => {
  test('Não tem header na tela de login', () => {
    renderWithRouterAndStore(<App />, '/');
    const topbtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchbtn = screen.getByTestId('search-top-btn');

    expect(topbtn).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();
    expect(searchbtn).not.toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de principal de receitas de comidas', () =>{
    renderWithRouterAndStore(<Foods />, '/comidas');

  })
});