import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

const INPUT_EMAIL_SELECTOR = 'email-input';
const INPUT_PASSWORD_SELECTOR = 'password-input';
const LOGIN_BUTTON_SELECTOR = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('Verifica os componentes requeridos na tela:', () => {
  it('Verifica se o input de email e senha, e o botão estão na tela', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.queryByTestId(INPUT_EMAIL_SELECTOR);
    const inputPassword = screen.queryByTestId(INPUT_PASSWORD_SELECTOR);
    const loginButton = screen.queryByTestId(LOGIN_BUTTON_SELECTOR);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verifica o se o botão de login vem desabilitado', () => {
    renderWithRouter(<App />);

    const button = screen.queryByTestId(LOGIN_BUTTON_SELECTOR);

    expect(button).toBeDisabled();
  });

  it('Botão de login continua desabilitado se digitado um email indevido', () => {
    renderWithRouter(<App />);

    const email = screen.queryByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.queryByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.queryByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, 'email');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  it('Botão de login continua desabilitado se digitado uma senha indevida', () => {
    renderWithRouter(<App />);

    const email = screen.queryByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.queryByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.queryByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();
  });

  it('Verifica o botão redireciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
