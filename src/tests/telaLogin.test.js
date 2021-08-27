import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const loginButton = 'login-submit-btn';
const emailLogin = 'alguem@email.com';
const passwordLogin = '1234567';
describe('testa se a Tela de Login', () => {
  it('contem o heading com texto Login', () => {
    renderWithReduxAndRouter(<App />);
    const headingLogin = screen.getByRole('heading', { name: /login/i });
    expect(headingLogin).toBeInTheDocument();
  });
  it('contém campo para digitar e-mail com testid específico', () => {
    renderWithReduxAndRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    expect(emailInput).toBeInTheDocument();
  });
  it('contém campo para digitiar senha com testid específico', () => {
    renderWithReduxAndRouter(<App />);
    const passwordInput = screen.getByTestId(passwordTestId);
    expect(passwordInput).toBeInTheDocument();
  });
  it('contém um botão de login com testid específico', () => {
    renderWithReduxAndRouter(<App />);
    const buttoLogin = screen.getByTestId(loginButton);
    expect(buttoLogin).toBeInTheDocument();
  });
  it('habilita o login com email e senha válidos', () => {
    renderWithReduxAndRouter(<App />);
    const validEmail = screen.getByTestId(emailTestId);
    const validPassword = screen.getByTestId(passwordTestId);
    const buttonLogin = screen.getByText('Entrar');
    userEvent.type(validEmail, emailLogin);
    userEvent.type(validPassword, passwordLogin);
    expect(buttonLogin).toBeEnabled();
  });
  it('ao fazer login válido, envia as informações para o localStorage', () => {
    renderWithReduxAndRouter(<App />);
    const validEmail = screen.getByTestId(emailTestId);
    const validPassword = screen.getByTestId(passwordTestId);
    const buttonLogin = screen.getByText('Entrar');
    userEvent.type(validEmail, emailLogin);
    userEvent.type(validPassword, passwordLogin);
    fireEvent.click(buttonLogin);
    const localStorageMeals = localStorage.getItem('mealsToken');
    const localStorageCocktails = localStorage.getItem('cocktailsToken');
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    expect(localStorageMeals).toBe('1');
    expect(localStorageCocktails).toBe('1');
    expect(localStorageUser.email).toBe(validEmail.value);
  });
});
describe('testa se', () => {
  it('ao entrar, o usuario é redirecionado para tela principal de receitas', () => {
    const { history } = renderWithReduxAndRouter(<App />);

    const validEmail = screen.getByPlaceholderText('Email');
    const validPassword = screen.getByTestId(passwordTestId);
    const buttonLogin = screen.getByText('Entrar');
    userEvent.type(validEmail, emailLogin);
    userEvent.type(validPassword, passwordLogin);
    fireEvent.click(buttonLogin);
    expect(buttonLogin).not.toHaveAttribute('disabled');
    userEvent.click(buttonLogin);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });
});
