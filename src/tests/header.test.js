import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';

const PROFILE_BUTTON_SRC_EXPECTED = 'profileIcon.svg';
const SEARCH_BUTTON_SRC_EXPECTED = 'searchIcon.svg';
const PAGE_TITLE_TEST_ID = 'page-title';

describe('Testando se o componente Header', () => {
  it('tem um botão que redireciona para a página de perfil', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toHaveAttribute('src', PROFILE_BUTTON_SRC_EXPECTED);
    userEvent.click(profileButton);
    await screen.findByTestId('profile-done-btn');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/perfil');
  });
  it('tem um botão que abre e fecha a área de busca', async () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toHaveAttribute('src', SEARCH_BUTTON_SRC_EXPECTED);
    userEvent.click(searchButton);
    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar Receita');
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('tem um Título com o nome da página dependendo da página', () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Comidas');
    history.push('/bebidas');
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Bebidas');
    history.push('/explorar');
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Explorar');
    history.push('/perfil');
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Perfil');
  });
});
