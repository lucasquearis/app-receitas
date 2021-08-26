import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Teste da tela de login', () => {
  test('O input de email deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(DATA_TESTID_EMAIL);
    expect(inputEmail).toBeInTheDocument();
  });
  test('O input de senha deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
  });
  test('O botão "Entrar" deve possuir o atributo data-testid', () => {
    renderWithRouter(<Login />);
    const buttonSubmit = screen.getByTestId(DATA_TESTID_PASSWORD);
    expect(buttonSubmit).toBeInTheDocument();
  });
});