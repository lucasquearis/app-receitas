import React from 'react';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from '../src/components/Login';
import { renderWithRouterAndStore } from './testConfig';


const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456';


describe('Componente Login', () => {
  test('A rota para esta página deve ser `/`', () => {
    const { history } = renderWithRouterAndStore(<App />, '/');
    expect(history.location.pathname).toBe('/');
  });
  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('Crie inputs com o texto Email e Password', () => {
    renderWithRouterAndStore(<App />, '/');
    // const linkElement = screen.getByText(/TRYBE/i);
    // expect(linkElement).toBeInTheDocument();
    const password = screen.getByText(/password/i);
    expect(password).toBeInTheDocument();
    const email = screen.getByText(/email/i);
    expect(email).toBeInTheDocument();

    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('O botão de "Entrar está desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndStore(<App />, '/');

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

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
})
