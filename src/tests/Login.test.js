import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testes relacionados a página de login', () => {
  beforeEach(() => renderWithRouter(<App />));

  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const loginButtonTestId = 'login-submit-btn';
  const emailValue = 'email@email.com';
  const passwordValue = '1234567';

  test('Verifica se os inputs de email e senha foram renderizados', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  test('Verifica se o botao de login foi renderizado desabilitado', () => {
    const loginButton = screen.getByTestId(loginButtonTestId);
    expect(loginButton).toBeDefined();
    expect(loginButton).toBeDisabled();
  });

  test('Verifica se é possível digitar email', () => {
    const emailInput = screen.getByTestId(emailTestId);
    userEvent.type(emailInput, emailValue);
    expect(screen.getByDisplayValue(emailValue)).toBeInTheDocument();
  });

  test('Verifica se é possível digitar senha', () => {
    const passwordInput = screen.getByTestId(passwordTestId);
    userEvent.type(passwordInput, passwordValue);
    expect(screen.getByDisplayValue(passwordValue)).toBeInTheDocument();
  });

  test('Verifica as regras para habilitar o botão', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, emailValue);
    userEvent.type(passwordInput, passwordValue);
    expect(loginButton).not.toBeDisabled();
  });
});
