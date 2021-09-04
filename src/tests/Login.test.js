import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const DATA_TESTID_EMAIL = 'email-input';
const DATA_TESTID_PASSWORD = 'password-input';
const DATA_TESTID_LOGIN_BUTTON = 'login-submit-btn';
const TEST_EMAIL = 'email@email.com';
const TEST_EMAIL_FAIL = 'email';
const TEST_PASSWORD = '1234567';
const TEST_PASSWORD_FAIL = '1234';

describe('Teste da tela de login', () => {
  test('O input de email deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    expect(inputEmail).toBeInTheDocument();
  });
  test('O input de senha deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
  });
  test('O botão "Entrar" deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(buttonSubmit).toBeInTheDocument();
  });
});

describe(`Desenvolva a tela de maneira que a pessoa deve
conseguir escrever seu email no input de email`, () => {
  test('Verifica se é possível escrever o email', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
  });
  test(`Desenvolva a tela de maneira que a pessoa deve
    conseguir escrever sua senha no input de senha`, () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
  });
});

describe('Verifica botão desabilitado ao preencher o formulário', () => {
  test('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL_FAIL);
    expect(inputEmail).toHaveValue(TEST_EMAIL_FAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toHaveAttribute('disabled');
  });
  test('O botão deve estar desativado se o password for inválido', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, TEST_PASSWORD_FAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD_FAIL);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toHaveAttribute('disabled');
  });
  test('O botão deve estar ativado se o email e o password forem válidos', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).not.toHaveAttribute('disabled');
  });
});

describe(`Salve 2 tokens no localStorage após a submissão,
  identificados pelas chaves mealsToken e cocktailsToken`, () => {
  test('verifica mealsToken', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).not.toHaveAttribute('disabled');
    userEvent.click(buttonSubmit);
    expect(localStorage.getItem('mealsToken')).toBe('1');
  });

  test('verifica cocktailsToken', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).not.toHaveAttribute('disabled');
    userEvent.click(buttonSubmit);
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

describe(`Salve o e-mail da pessoa usuária no localStorage na chave
  user após a submissão`, () => {
  test('testa se o email é salvo no state User', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).not.toHaveAttribute('disabled');
    userEvent.click(buttonSubmit);
    const localStorageUser = localStorage.getItem('user');
    expect(JSON.parse(localStorageUser)).toEqual({ email: TEST_EMAIL });
  });
});

describe(`Verifica se o usuário é redirecionado à pagina de comidas
  ao realizar login`, () => {
  test('Verifica redirecionamento', () => {
    const { history } = renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_LOGIN_BUTTON);
    expect(buttonSubmit).not.toHaveAttribute('disabled');
    userEvent.click(buttonSubmit);
    const URL_COMIDAS = history.location.pathname;
    expect(URL_COMIDAS).toEqual('/comidas');
  });
});
