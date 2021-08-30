import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const submitButtonTestId = 'login-submit-btn';
const validEmail = 'test@satelite.com';
const validPassword = '1b3d5f7';
const invalidEmail = '@test@wrong';
const invalidPassword = 'ab12';

describe('Testa tela de Login', () => {
  it('Existência dos campos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Preenchimento dos campos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(emailInput).toHaveAttribute('value', 'test@satelite.com');
    expect(passwordInput).toHaveAttribute('value', '1b3d5f7');
  });

  it('Validação do preenchimento', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('Envio de informações ao local storage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    fireEvent.click(submitButton);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = localStorage.getItem('user');

    expect(mealsToken).toBeDefined();
    expect(cocktailsToken).toBeDefined();
    expect(user).toBeDefined();
    expect(JSON.parse(user)).toStrictEqual({ email: validEmail });
  });

  it('Redireciona para página de receitas', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    fireEvent.click(submitButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
