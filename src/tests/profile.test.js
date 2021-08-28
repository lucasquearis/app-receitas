import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import { Profile } from '../pages';

const PAGE_TITLE_TEST_ID = 'page-title';
const EMAIL_TEST_ID = 'profile-email';

describe('testa se a Tela de Profile', () => {
  it('contem o heading com texto Profile e e-mail', () => {
    renderWithReduxAndRouter(<Profile />);

    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Perfil');
    expect(screen.getByTestId(EMAIL_TEST_ID)).toBeInTheDocument();
  });

  it('contem botão de receita feita e seu redirecionamento', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/perfil' });

    const profileDoneButton = screen.getByTestId('profile-done-btn');
    expect(profileDoneButton).toBeInTheDocument();
    userEvent.click(profileDoneButton);
    await screen.findByTestId('filter-by-food-btn');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-feitas');
  });
  it('contem botão de receita favorita e seu redirecionamento', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/perfil' });

    const profileFavoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(profileFavoriteButton).toBeInTheDocument();
    userEvent.click(profileFavoriteButton);
    await screen.findByTestId('filter-by-drink-btn');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-favoritas');
  });
  it('contem botão de sair e seu redirecionamento', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/perfil' });

    const profileLogoutButton = screen.getByTestId('profile-logout-btn');
    expect(profileLogoutButton).toBeInTheDocument();
    userEvent.click(profileLogoutButton);
    await screen.findByTestId('login-submit-btn');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('contem um footer', () => {
    renderWithReduxAndRouter(<Profile />);

    const profileFooterButton = screen.getByTestId('footer');
    expect(profileFooterButton).toBeInTheDocument();
    userEvent.click(profileFooterButton);
  });
});
