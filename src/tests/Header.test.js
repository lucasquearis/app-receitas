import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const INPUT_EMAIL_SELECTOR = 'email-input';
const INPUT_PASSWORD_SELECTOR = 'password-input';
const LOGIN_BUTTON_SELECTOR = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const PAGE_TITLE_SELECTOR = 'page-title';
const PROFILE_BTN = 'profile-top-btn';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testa renderização do componente Header.jsx', () => {
  it('Testa se existe três elementos no Header', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    expect(screen.getByTestId(PAGE_TITLE_SELECTOR)).toBeInTheDocument();
    expect(screen.getByTestId(PROFILE_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_BTN)).toBeInTheDocument();
  });

  it('Testa redirect do botão Profile', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    userEvent.click(screen.getByTestId(PROFILE_BTN));

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Testa botão Search', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    userEvent.click(screen.getByTestId(SEARCH_BTN));

    const checkbox1 = screen.getByRole('radio', { name: /Ingredientes/i });
    const checkbox2 = screen.getByRole('radio', { name: /Nome/i });
    const checkbox3 = screen.getByRole('radio', { name: /Primeira letra/i });

    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
    expect(checkbox3).toBeInTheDocument();
  });
});
