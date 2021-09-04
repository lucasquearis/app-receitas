import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../pages/Meals';
import SubHeader from '../components/SubHeader';

const SEARCH_BTN = 'search-top-btn';

describe('Teste elementos do header na tela principal de receitas', () => {
  test('O botão de perfil deve possuir o atributo data-testid', () => {
    renderWithRouter(<SubHeader />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  test('O titulo deve possuir o atributo data-testid', () => {
    renderWithRouter(<SubHeader />);
    const titleH1 = screen.getByTestId('page-title');
    expect(titleH1).toBeInTheDocument();
  });
  test('O botão pesquisar deve possuir o atributo data-testid', () => {
    renderWithRouter(<Header />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('Teste ícone para a tela de perfil,  título e  ícone para a busca', () => {
  test('O botão de perfil e pesquisar devem possuir icone correpondente', () => {
    renderWithRouter(<SubHeader />);
    const icon = 'profileIcon.svg';
    const icon2 = 'searchIcon.svg';
    const locations = screen.getAllByRole('img', { name: /button-icon/i });
    expect(locations.length).toBe(2);
    expect(locations[0]).toHaveAttribute('src', icon);
    expect(locations[1]).toHaveAttribute('src', icon2);
  });
});

describe(`Verifica se o usuário é redirecionado à pagina de perfil
  ao clicar no icone`, () => {
  test('Verifica redirecionamento', () => {
    const { history } = renderWithRouter(<Header />);
    const btnProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const URL_PROFILE = history.location.pathname;
    expect(URL_PROFILE).toEqual('/perfil');
  });
});

describe(`Verifica se a barra de busca renderiza
   ao clicar no icone`, () => {
  test('Verifica se aparece', () => {
    renderWithRouter(<Header />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
  test('Verifica se desaparece', () => {
    renderWithRouter(<Header />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
