import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1123456';

describe('1 -Login com os seguintes campos e características:', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithReduxAndRouter(<App />, '/');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Crie um botao com o texto \'Entrar\'', () => {
    renderWithReduxAndRouter(<App />, '/');
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button).toBeInTheDocument();
  });
  test('Local para digitar senha e email', () => {
    renderWithReduxAndRouter(<App />, '/');

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('Verifica se botao esta desabilitado', () => {
    renderWithReduxAndRouter(<App />, '/');

    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button).toBeDisabled();
  });
  test('Botão de "Entrar está desabilitado quando um email inválido é digitado', () => {
    renderWithReduxAndRouter(<App />, '/');

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });
  test('Botão de "Entrar está desabilitado quando uma senha inválida é digitada', () => {
    renderWithReduxAndRouter(<App />, '/');

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
  });
  test('Botão de "Entrar" habilitado quando email e senha válidos são passados', () => {
    renderWithReduxAndRouter(<App />, '/');

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});
