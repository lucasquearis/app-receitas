import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('Testes tela de Login', () => {
  it('verifica se existem 2 inputs e 1 botao na tela', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByTestId(/login-submit-btn/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
