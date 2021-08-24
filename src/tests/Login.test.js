import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(submitButton).toBeDisabled();
  });

  it('verifica se apos o preenchimento dos inputs o botão é habilitado', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1324141');
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
