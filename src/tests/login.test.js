import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const emailInputId = 'email-input';
const passwordInputId = 'password-input';
const buttonId = 'login-submit-btn';

const VALID_EMAIL = 'valid123@trybe.com.br';
const VALID_PASSWORD = 'grupo24';
const INVALID_EMAIL = 'invalid@invalid';
const INVALID_PASSWORD = '123456';

describe('Test Login route', () => {
  it('Route should be \'/\'', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toEqual('/');
  });
});

describe('Test Login screen rendering', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Renders input for email', () => {
    expect(screen.getByTestId(emailInputId)).toBeInTheDocument();
  });

  it('Renders input for password', () => {
    expect(screen.getByTestId(passwordInputId)).toBeInTheDocument();
  });

  it('Renders Login button', () => {
    expect(screen.getByTestId(buttonId)).toBeInTheDocument();
  });
});

describe('Test Login inputs', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Can type e-mail', () => {
    const emailInput = screen.getByTestId(emailInputId);
    userEvent.type(emailInput, 'email@email.com');
    expect(emailInput.value).toEqual('email@email.com');
  });

  it('Can type password', async () => {
    const passwordInput = screen.getByTestId(passwordInputId);
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toEqual('1234567');
  });
});

describe('Tests Login validation', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Button remains disabled with invalid data on both inputs', () => {
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  it('Button remains disabled with invalid email, but valid password inputs', () => {
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  it('Button remains disabled with valid email, but invalid password inputs', () => {
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  it('Button enables with both valid inputs', () => {
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).not.toBeDisabled();
  });
});

describe('Tests Login submit', () => {
  it('Should save email under \'user\' key in localStorage ', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginButton);

    const { email } = JSON.parse(localStorage.getItem('user'));
    expect(email).toEqual(VALID_EMAIL);
  });

  it('Should save tokens in localStorage with values equal to 1', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginButton);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(mealsToken).toEqual(1);
    expect(cocktailsToken).toEqual(1);
  });

  it('Should redirect user to path \'/comidas\'', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginButton);

    expect(history.location.pathname).toEqual('/comidas');
  });
});
