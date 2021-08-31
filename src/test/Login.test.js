import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// beforeEach(() => {
//   renderWithRouter(<App />);
// });

const idEmail = 'email-input';
const idPassword = 'password-input';
const idLoginButton = 'login-submit-btn';
const emailTest = 'email@mail.com';

describe('2 - verifica os data-testid', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButtton).toBeInTheDocument();
  });
});

describe('3 - A pessoa deve conseguir escrever no input de email', () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);

    userEvent.type(emailInput, emailTest);
  });
});

describe('4 - a pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(idPassword);

    userEvent.type(passwordInput, '123456');
  });
});

describe('5 - É válido após um email válido e uma senha de mais de 6 caracteres', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(loginButtton).toBeDisabled();
    userEvent.type(emailInput, 'email@mail');
    userEvent.type(passwordInput, '1234567');
    expect(loginButtton).toBeDisabled();

    expect(loginButtton).toBeDisabled();
    userEvent.type(emailInput, 'email.com');
    expect(loginButtton).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(loginButtton).toBeDisabled();
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '123456');
    expect(loginButtton).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(loginButtton).toBeDisabled();
    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButtton).toBeEnabled();
  });
});

describe('6 - Salve 2 tokens no localStorage: mealsToken e cocktailsToken', () => {
  it('MealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    renderWithRouter(<App />);
    localStorage.clear();
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(loginButtton).toBeDisabled();
    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButtton);
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    renderWithRouter(<App />);
    localStorage.clear();
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButtton = screen.getByTestId(idLoginButton);

    expect(loginButtton).toBeDisabled();
    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButtton);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: emailTest });
  });
});

describe('8 - Redirecione a pessoa usuária para a tela receitas de comidas.', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButton = screen.getByTestId(idLoginButton);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
