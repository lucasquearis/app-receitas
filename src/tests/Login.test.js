import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes tela de Login', () => {
  const emailMock = 'test@test.test';
  const wrongEmailMock = 'test.test.test';
  const passwordMock = 'aaaaaaa';
  const wrongPasswordMock = 'aaaaaa';

  it('Verifica se existem 2 inputs e 1 botao na tela', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByTestId(/login-submit-btn/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verifica que o botao fica desabilitado ate usar email e password validos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByTestId(/login-submit-btn/i);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, wrongEmailMock);
    userEvent.type(passwordInput, wrongPasswordMock);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, emailMock);
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, passwordMock);
    expect(loginButton).not.toBeDisabled();
  });

  it('Verifica que vai para pagina comidas ao clicar no botao Entrar', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, emailMock);
    userEvent.type(passwordInput, passwordMock);
    userEvent.click(loginButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/comidas');
  });

  it('Verifica que as informacoes no local Storage ao clicar no botao', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, emailMock);
    userEvent.type(passwordInput, passwordMock);
    userEvent.click(loginButton);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = JSON.parse(localStorage.getItem('user'));

    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(user).toStrictEqual({ email: emailMock });
  });
});
