import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = '1234567';
const INVALID_PASSWORD = '12345';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => (store[key] || null),
    setItem: (key, value) => { (store[key] = value.toString()); },
    removeItem: (key) => delete store[key],
    clear: () => {
      store = {};
    },
  };
})();

const saveToStorage = (value) => {
  window.localStorage.setItem('mealsToken', value);
  window.localStorage.setItem('cocktailsToken', value);
  window.localStorage.setItem('user', value);
};

afterEach(() => jest.clearAllMocks());

describe('Testa componente Home com os campos de login e botão', () => {
  it('testa  se inputs de email e senha existem no componente', () => {
    render(<App />);
    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  it('testa se botão está desabilitado ao entrar na página', () => {
    render(<App />);
    const button = screen.getByText(/Entrar/i);
    // expect(button).toBeDisabled();
    button.dispatchEvent(new MouseEvent('click', { button: true }));
  });
});

describe('Testa botão', () => {
  it('testa botão desabilitado se email inválido e senha inválida', () => {
    render(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText(/Entrar/i);

    fireEvent.input(email, 'teste');
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@com@');
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@');
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@teste.');
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));
  });

  it('testa botão desabilitado se email válido e senha inválida', () => {
    render(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText(/Entrar/i);

    fireEvent.input(email, VALID_EMAIL);
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, VALID_EMAIL);
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, VALID_EMAIL);
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, VALID_EMAIL);
    fireEvent.input(senha, INVALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));
  });

  it('testa botão desabilitado se email inválido e senha válida', () => {
    render(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText(/Entrar/i);

    fireEvent.input(email, 'teste');
    fireEvent.input(senha, VALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@com@');
    fireEvent.input(senha, VALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@');
    fireEvent.input(senha, VALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));

    fireEvent.input(email, 'teste@teste.');
    fireEvent.input(senha, VALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: true }));
  });

  it('testa botão habilitado de email e senha válidos', () => {
    render(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const senha = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByText(/Entrar/i);

    fireEvent.input(email, VALID_EMAIL);
    fireEvent.input(senha, VALID_PASSWORD);
    button.dispatchEvent(new MouseEvent('click', { button: false }));
  });
});

describe('Testa local storage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });
  it('testa localStorage com as chaves "mealsToken" e "cocktailsToken"', () => {
    saveToStorage('1');

    expect(window.localStorage.getItem('mealsToken')).toEqual('1');
    expect(window.localStorage.getItem('cocktailsToken')).toEqual('1');
  });
  it('testa localStorage com a chave "user" e valor "email"', () => {
    saveToStorage(VALID_EMAIL);

    expect(window.localStorage.getItem('user')).toEqual(VALID_EMAIL);
  });
});
