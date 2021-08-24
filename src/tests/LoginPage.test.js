import { screen } from '@testing-library/dom';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const inputEmailId = 'email-input';
const inputPasswordId = 'password-input';
const loginBtnId = 'login-submit-btn';

const validEmail = 'maingroup18@trybe.com';
const validPassword = 'maingroup18';
const invalidEmail = 'invalidEmail@trybe.com.br';
const invalidPassword = '012345';

describe('Test LoginScreen component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Renders input for email', () => {
    expect(screen.getByTestId(inputEmailId)).toBeInTheDocument();
  });

  it('Renders input for password', () => {
    expect(screen.getByTestId(inputPasswordId)).toBeInTheDocument();
  });

  it('Render login button', () => {
    expect(screen.getByTestId(loginBtnId)).toBeInTheDocument();
  });
});

describe('Inputs tests', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Test type email', () => {
    const emailInput = screen.getByTestId(inputEmailId);

    userEvent.type(emailInput, 'group-18@trybe.com');

    expect(emailInput).toHaveValue('group-18@trybe.com');
  });

  it('Test type password', () => {
    const passwordInput = screen.getByTestId(inputPasswordId);

    userEvent.type(passwordInput, '123456');

    expect(passwordInput).toHaveValue('123456');
  });
});

describe('Test if buttons are disabled until conditions checked', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const loginBtn = screen.getByTestId(loginBtnId);
    expect(loginBtn).toBeDisabled();
  });

  it('Test if button is disabled after invalid email', () => {
    const emailInput = screen.getByTestId(inputEmailId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(emailInput, invalidEmail);
    expect(loginBtn).toBeDisabled();
  });

  it('Test if button is disabled after invalid password', () => {
    const passwordInput = screen.getByTestId(inputPasswordId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(passwordInput, invalidPassword);
    expect(loginBtn).toBeDisabled();
  });

  it('Test if button is disabled after typing invalid email and password', () => {
    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPassword);
    expect(loginBtn).toBeDisabled();
  });
});

describe('Test keys mealsToken and cocktailsToken on localStorage', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Test if mealsToken is a key on localStorage', () => {
    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(loginBtn);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(mealsToken).toEqual(1);
    expect(cocktailsToken).toEqual(1);
  });
});
