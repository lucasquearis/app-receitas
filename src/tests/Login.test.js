import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Testando pagina Login', () => {
  it('verifica se contem os inputs de textos e o botão submit', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeDisable();
  });
});
