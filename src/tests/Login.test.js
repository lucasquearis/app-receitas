import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const EMAIL_ID = 'email-input';

describe('Realiza os testes da pagina de Login', () => {
  it('Verifica se todos os campos existem', () => {
    renderWithRouter(<Login />);

    const login = screen.getByTestId(EMAIL_ID);
    expect(login).toBeInTheDocument();

    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  it('Verifica se preencher incorretamente os campos o botão esta desabilitado', () => {
    const { history } = renderWithRouter(<Login />);
    const login = screen.getByTestId(EMAIL_ID);
    userEvent.type(login, 'emailerrado.com');
    const password = screen.getByPlaceholderText(/password/i);
    userEvent.type(password, '123456789');
    const button = screen.getByRole('button', { name: /entrar/i });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(button).toHaveAttribute('disabled');
  });

  it('Verifica se preencher corretamente os campos o botão fica habilitado', () => {
    const { history } = renderWithRouter(<Login />);
    const login = screen.getByTestId(EMAIL_ID);
    userEvent.type(login, 'emailcorreto@email.com');
    const password = screen.getByPlaceholderText(/password/i);
    userEvent.type(password, 'senhadificildemais');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).not.toHaveAttribute('disabled');
    expect(history.location.pathname).toBe('/');

    userEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });
});
