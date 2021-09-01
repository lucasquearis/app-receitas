import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const INPUT_EMAIL_SELECTOR = 'email-input';
const INPUT_PASSWORD_SELECTOR = 'password-input';
const LOGIN_BUTTON_SELECTOR = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const PROFILE_BTN = 'profile-top-btn';
const DONE_BTN = 'profile-done-btn';

describe.only('Testa page Perfil', () => {
  it('Testa se existe três botões', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));
    userEvent.click(screen.getByTestId(PROFILE_BTN));

    expect(screen.getByTestId(DONE_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(DONE_BTN)).toBeInTheDocument();
  });
});
