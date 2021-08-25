import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import Login from '../pages/login/Login';

import { renderWithRouterAndStore } from './testConfig';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456';

describe(`1 - Crie uma página inicial de login com 
  os seguintes campos e características:`, () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<Login />, '/');
    expect(history.location.pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<Login />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
});

describe(`2 - Realize as seguintes verificações
           nos campos de email, senha e botão:`, () => {
  test('O botão de "Entrar" está desabilitado ao entrar na página', () => {
    renderWithRouterAndStore(<Login />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });

  test('O botão de "Entrar está desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndStore(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  test(`o botão de "Entrar está desabilitado 
        quando uma senha inválida é digitada`, () => {
    renderWithRouterAndStore(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
  });

  test(`O botão de "Entrar" está habilitado 
        quando um email e uma senha válidos são passados`, () => {
    renderWithRouterAndStore(<Login />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});

describe(`testa a rota ao clicar no botão 
         no botão com email e senha validos `, () => {
  test('A rota deve ser mudada para \'/explorar\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<Login />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/explorar');
  });
});
