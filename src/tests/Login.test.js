// acessar os elementos da tela

// interagir com esses elementos (se necessário)

// fazer os testes

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from '../services/renderWithRouter';

const DATA_TEST_ID_BUTTON = 'login-submit-btn';

describe('Verifica existência de elementos do Login', () => {
  it('Verifica se há input do tipo email', () => {
    const { getByLabelText } = render(<Login />);

    const inputEmail = getByLabelText(/email/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.type).toBe('email');
  });

  it('Verifica se há input do tipo password', () => {
    const { getByLabelText } = render(<Login />);

    const inputPassword = getByLabelText(/senha/i);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.type).toBe('password');
  });

  it('Verifica se há botão com id específico', () => {
    const { getByTestId } = render(<Login />);
    const button = getByTestId(DATA_TEST_ID_BUTTON);
    expect(button).toBeInTheDocument();
  });
});

describe('Verifica interações do usuário com Login', () => {
  it('Verifica se o botão não desabilita ao inserir email errado', () => {
    const { getByLabelText, getByTestId } = render(<Login />);

    const inputEmail = getByLabelText(/email/i);
    const inputPassword = getByLabelText(/senha/i);
    const button = getByTestId(DATA_TEST_ID_BUTTON);

    expect(button).toBeDisabled();

    fireEvent.change(inputEmail, { target: { value: 'teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(button.disabled).toBe(true);
  });

  it('Verifica se o botão não desabilita ao inserir senha errada', () => {
    const { getByLabelText, getByTestId } = render(<Login />);

    const inputEmail = getByLabelText(/email/i);
    const inputPassword = getByLabelText(/senha/i);
    const button = getByTestId(DATA_TEST_ID_BUTTON);

    expect(button).toBeDisabled();

    fireEvent.change(inputEmail, { target: { value: '123@teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });

    expect(button.disabled).toBe(true);
  });

  it('Verifica se o botão é habilitado ao inserir email e senha válidos', () => {
    const { getByLabelText, getByTestId } = render(<Login />);

    const inputEmail = getByLabelText(/email/i);
    const inputPassword = getByLabelText(/senha/i);
    const button = getByTestId(DATA_TEST_ID_BUTTON);

    expect(button).toBeDisabled();

    fireEvent.change(inputEmail, { target: { value: 'teste@teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(button.disabled).toBe(false);
  });

  it('Verifica se usuário é renderizado ao clicar em botão', () => {
    const { getByLabelText, getByTestId, history } = renderWithRouter(<Login />);

    const inputEmail = getByLabelText(/email/i);
    const inputPassword = getByLabelText(/senha/i);
    const button = getByTestId(DATA_TEST_ID_BUTTON);
    let pathName = history.location.pathname;

    fireEvent.change(inputEmail, { target: { value: 'teste@teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(pathName).toBe('/');

    fireEvent.click(button);

    pathName = history.location.pathname;

    expect(pathName).toBe('/comidas');

    expect();
  });
});
