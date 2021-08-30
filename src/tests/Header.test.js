import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const profileButton = 'profile-top-btn';
const pageTitle = 'page-title';
const searchButton = 'search-top-btn';
const searchInput = 'search-input';

describe('9 - Verifica elementos do Header', () => {
  it('Verifica existencia do botão de perfil, título e botão de pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    expect(screen.getByTestId(profileButton)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(searchButton)).toBeInTheDocument();
  });
});

describe('10 - Verifica existencia do Header de acordo com protótipo', () => {
  const hasHeader = (title = '', haveSearchButton = true) => {
    expect(screen.getByTestId(profileButton).firstChild)
      .toHaveProperty('src', `http://localhost/${profileIcon}`);
    expect(screen.getByTestId(pageTitle).innerHTML).toBe(title);
    if (haveSearchButton) {
      expect(screen.getByTestId(searchButton).firstChild)
        .toHaveProperty('src', `http://localhost/${searchIcon}`);
    } else {
      expect(screen.queryByTestId(searchButton)).not.toBeInTheDocument();
    }
  };

  const hasNoHeader = () => {
    expect(screen.queryByTestId(profileButton)).not.toBeInTheDocument();
    expect(screen.queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(screen.queryByTestId(searchButton)).not.toBeInTheDocument();
  };

  it('Não há Header na tela de login', () => {
    renderWithRouterAndRedux(<App />);
    hasNoHeader();
  });

  it('Header com ícones corretos na tela principal de receitas de comida', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    hasHeader('Comidas');
  });

  it('Header com ícones corretos na tela principal de receitas de bebida', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/bebidas'] });
    hasHeader('Bebidas');
  });

  it('Não há Header na tela de detalhes de receita de comida em progresso', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas/52771/in-progress'] });
    hasNoHeader();
  });

  it('Não há Header na tela de detalhes de receita de bebida em progresso', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/bebidas/178319/in-progress'] });
    hasNoHeader();
  });

  it('Não há Header na tela de detalhes de receita de comida', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas/52771'] });
    hasNoHeader();
  });

  it('Não há Header na tela de detalhes de receita de bebida', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/bebidas/178319'] });
    hasNoHeader();
  });

  it('Header com ícones corretos na de explorar', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explorar'] });
    hasHeader('Explorar', false);
  });

  it('Header com ícones corretos na tela de explorar comidas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explorar/comidas'] });
    hasHeader('Explorar Comidas', false);
  });

  it('Header com ícones corretos na tela de explorar bebidas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explorar/bebidas'] });
    hasHeader('Explorar Bebidas', false);
  });

  it('Header com ícones corretos na tela de explorar comidas por ingrediente', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explorar/comidas/ingredientes'] });
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header com ícones corretos na tela de explorar bebidas por ingrediente', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explorar/bebidas/ingredientes'] });
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header com ícones corretos na tela de explorar por local de origem', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explorar/comidas/area'] });
    hasHeader('Explorar Origem');
  });

  it('Header com ícones corretos na tela de perfil', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/perfil'] });
    hasHeader('Perfil', false);
  });

  it('Header com ícones corretos na tela de receitas favoritas', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/receitas-favoritas'] });
    hasHeader('Receitas Favoritas', false);
  });

  it('Header com ícones corretos na tela de receitas feitas', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/receitas-feitas'] });
    hasHeader('Receitas Feitas', false);
  });
});

describe('11 - Verifica funcionalidade do botão de perfil', () => {
  it('Ao clicar no botão de perfil, o usuário é redirecionado para /perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/comidas'] });
    userEvent.click(screen.getByTestId(profileButton));

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
});

describe('12 - Verifica funcionalidade do botão de busca', () => {
  it('Ao clicar no botão de busca, a barra de busca aparece', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(searchButton));
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca novamente, a barra de busca desaparece', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(searchButton));
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(searchButton));
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });
});
