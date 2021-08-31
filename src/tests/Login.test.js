import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouterPath';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const INVALID_PASSWORD = '123';

describe('testa pagina de login', () => {
  it('path da pagina', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('campo para email e senha', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Botao entrar estar desabilitado ao abrir a pagina', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText(/Entrar/i);

    expect(btn).toBeDisabled();
  });

  it('Botao entrar nao habilitar com dados invalidos', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText(/Entrar/i);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(btn).toBeDisabled();

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btn).toBeDisabled();
  });

  it('Botao entrar ser habilitado com dados válidos', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText(/Entrar/i);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btn).toBeEnabled();
  });

  it('redirecionar ao clicar no botao', () => {
    const { history } = renderWithRouter(<App />);
    const btn = screen.getByText(/Entrar/i);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    fireEvent.click(btn);

    expect(history.location.pathname).toBe('/comidas');
  });
});
