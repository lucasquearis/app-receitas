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
const FOOTER_SELECTOR = 'footer';
const DRINKS_BTN_SELECTOR = 'drinks-bottom-btn';
const FOOD_BTN_SELECTOR = 'food-bottom-btn';
const EXPLORE_BTN_SELECTOR = 'explore-bottom-btn';

describe('Testa renderização do componente Footer.jsx', () => {
  it('Testa se existe elemento footer', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const footer = screen.getByTestId(FOOTER_SELECTOR);
    expect(footer).toBeInTheDocument();
  });

  it('Testa se existem três links', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const drinkBtn = screen.getByTestId(DRINKS_BTN_SELECTOR);
    const foodBtn = screen.getByTestId(FOOD_BTN_SELECTOR);
    const exploreBtn = screen.getByTestId(EXPLORE_BTN_SELECTOR);

    expect(drinkBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
  });
});

describe('Testa rotas do elemento Footer.jsx', () => {
  it('Testa rota para /bebidas', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const drinkBtn = screen.getByTestId(DRINKS_BTN_SELECTOR);
    userEvent.click(drinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('Testa rota para /explorar', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const exploreBtn = screen.getByTestId(EXPLORE_BTN_SELECTOR);
    userEvent.click(exploreBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('Testa rota para /comidas', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL_SELECTOR);
    const password = screen.getByTestId(INPUT_PASSWORD_SELECTOR);
    const button = screen.getByTestId(LOGIN_BUTTON_SELECTOR);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const foodBtn = screen.getByTestId(FOOD_BTN_SELECTOR);
    userEvent.click(foodBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
