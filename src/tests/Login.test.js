import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginButton = 'login-submit-btn';
const testEmail = 'teste@teste.com';

describe('2 - Verifica se os elementos foram criados', () => {
  it('Verifica existencia dos campos de email, senha e botão de entrar', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(emailInput)).toBeInTheDocument();
    expect(screen.getByTestId(passwordInput)).toBeInTheDocument();
    expect(screen.getByTestId(loginButton)).toBeInTheDocument();
  });
});

describe('3 - Verifica funcionalidade input de email', () => {
  it('Verifica se é possível digitar no campo de email', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    userEvent.type(email, testEmail);
    expect(email.value).toBe(testEmail);
  });
});

describe('4 - Verifica funcionalidade input de email', () => {
  it('Verifica se é possível digitar no campo de senha', () => {
    renderWithRouterAndRedux(<App />);

    const password = screen.getByTestId(passwordInput);
    userEvent.type(password, '1234567');
    expect(password.value).toBe('1234567');
  });
});

describe('5 - Verifica validação dos campos de email e senha', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('Botão de entrar inicia desabilitado', () => {
    expect(screen.getByTestId(loginButton)).toHaveProperty('disabled', true);
  });

  it('Botão de entrar continua desabilitado com email inválido', () => {
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    userEvent.type(email, 'teste@teste');
    userEvent.type(password, '12345678');
    expect(screen.getByTestId(loginButton)).toHaveProperty('disabled', true);
  });

  it('Botão de entrar continua desabilitado com senha inválida', () => {
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    userEvent.type(email, testEmail);
    userEvent.type(password, '123456');
    expect(screen.getByTestId(loginButton)).toHaveProperty('disabled', true);
  });

  it('Botão de entrar é habilitado com email e senha válidos', () => {
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    userEvent.type(email, testEmail);
    userEvent.type(password, '1234567');
    expect(screen.getByTestId(loginButton)).toHaveProperty('disabled', false);
  });
});

describe('6 - Salva tokens no local storage após clicar no botão', () => {
  it('Verifica existencia dos tokens mealsToken e cocktailsToken com valor 1',
    async () => {
      renderWithRouterAndRedux(<App />);
      localStorage.clear();
      expect(localStorage.getItem('mealsToken')).toBe(null);
      expect(localStorage.getItem('cocktailsToken')).toBe(null);

      const email = screen.getByTestId(emailInput);
      const password = screen.getByTestId(passwordInput);
      userEvent.type(email, testEmail);
      userEvent.type(password, '1234567');
      userEvent.click(screen.getByTestId(loginButton));

      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
    });
});

describe('7 - Salva email no local storage após clicar no botão', () => {
  it('Verifica existencia da chave user com valor do email em um objeto no local storage',
    async () => {
      renderWithRouterAndRedux(<App />);
      localStorage.clear();
      expect(localStorage.getItem('user')).toBe(null);

      const email = screen.getByTestId(emailInput);
      const password = screen.getByTestId(passwordInput);
      userEvent.type(email, testEmail);
      userEvent.type(password, '1234567');
      userEvent.click(screen.getByTestId(loginButton));

      const user = JSON.parse(localStorage.getItem('user'));
      expect(user).toEqual({ email: testEmail });
    });
});

describe('8 - Redireciona o usuário para a página de receitas após o login', () => {
  it('Verifica se a rota após o clique é /comidas',
    async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const email = screen.getByTestId(emailInput);
      const password = screen.getByTestId(passwordInput);
      userEvent.type(email, testEmail);
      userEvent.type(password, '1234567');
      userEvent.click(screen.getByTestId(loginButton));

      const { pathname } = history.location;
      expect(pathname).toBe('/comidas');
    });
});
