import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const EMAIL_TESTID = 'email-input';
const PASSWORD_TESTID = 'password-input';
const BUTTON_TESTID = 'login-submit-btn';
const EMAIL_TEST = 'teste@teste.com';

describe('Testando a Tela de Login (Tela inicial da Aplicação', () => {
  let history = {};

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });

  it('Testando se a rota está correta', () => {
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Testando se o Título, Inputs e Botões renderizam', () => {
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Receitas');

    const emailInput = screen.getByTestId(EMAIL_TESTID);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByTestId(BUTTON_TESTID);
    expect(submitButton).toBeInTheDocument();
  });

  it('Testando se o botão não habilita com email e senhas incorretos', () => {
    const { location: { pathname } } = history;
    const emailInput = screen.getByTestId(EMAIL_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    const submitButton = screen.getByTestId(BUTTON_TESTID);

    // Se o usuário apenas digita o email
    userEvent.type(emailInput, 'Xablau');
    expect(emailInput).toHaveValue('Xablau');
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute('disabled');
    expect(pathname).toBe('/');

    // Se o usuário apenas digita a senha
    userEvent.type(passwordInput, '123456');
    expect(passwordInput).toHaveValue('123456');
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute('disabled');
    expect(pathname).toBe('/');

    // Se o usuário digita email incorreto e senha incorreta
    userEvent.type(emailInput, 'Xablau');
    expect(emailInput).toHaveValue('Xablau');
    userEvent.type(passwordInput, '12345');
    expect(passwordInput).toHaveValue('12345');
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute('disabled');
    expect(pathname).toBe('/');

    // Se o usuário digita email incorreto e senha correta
    userEvent.type(emailInput, 'Xablau');
    expect(emailInput).toHaveValue('Xablau');
    userEvent.type(passwordInput, '123456');
    expect(passwordInput).toHaveValue('123456');
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute('disabled');
    expect(pathname).toBe('/');

    // Se o usuário digita email correto e senha incorreta
    userEvent.type(emailInput, EMAIL_TEST);
    expect(emailInput).toHaveValue(EMAIL_TEST);
    userEvent.type(passwordInput, '12345');
    expect(passwordInput).toHaveValue('12345');
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute('disabled');
    expect(pathname).toBe('/');
  });

  it('Testando se a página redireciona com email e senha corretos', () => {
    const emailInput = screen.getByTestId(EMAIL_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    const submitButton = screen.getByTestId(BUTTON_TESTID);

    userEvent.type(emailInput, EMAIL_TEST);
    expect(emailInput).toHaveValue(EMAIL_TEST);
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue('1234567');

    userEvent.click(submitButton);
    expect(history.location.pathname).toEqual('/comidas');
  });

  it('Testando se as informações ficam salvas no Local Storage', () => {
    const emailInput = screen.getByTestId(EMAIL_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    const submitButton = screen.getByTestId(BUTTON_TESTID);

    userEvent.type(emailInput, EMAIL_TEST);
    expect(emailInput).toHaveValue(EMAIL_TEST);
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue('1234567');

    userEvent.click(submitButton);
    expect(history.location.pathname).toEqual('/comidas');
    expect(localStorage.getItem('user')).toBe('{"email":"teste@teste.com"}');
    expect(localStorage.getItem('mealsToken')).toEqual('1');
    expect(localStorage.getItem('cocktailsToken')).toEqual('1');
  });
});
