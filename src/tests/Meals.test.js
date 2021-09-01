import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import meals from '../../cypress/mocks/meals';
import App from '../App';

const INPUT_EMAIL_SELECTOR = 'email-input';
const INPUT_PASSWORD_SELECTOR = 'password-input';
const LOGIN_BUTTON_SELECTOR = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const PAGE_TITLE_SELECTOR = 'page-title';
const FOOTER_SELECTOR = 'footer';
const TWELVE = 12;
const ALL_CATEGORIY = 'All-category-filter';
// const BEEF_CATEGORY = 'Beef-category-filter';
// const BREAKFAST_CATEGORY = 'Breakfast-category-filter';
// const CHICKEN_CATEGORY = 'Chicken-category-filter';
// const DESSERT_CATEGORY = 'Dessert-category-filter';
// const GOAT_CATEGORY = 'Goat-category-filter';

const mockFetchMeals = async () => ({
  json: async () => meals,
});

describe('Teste da page Comidas', () => {
  it('Testa se renderiza 12 receitas', async () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    global.fetch = jest.fn(mockFetchMeals);
    expect(await screen.findAllByRole('listitem')).toHaveLength(TWELVE);
  });

  it('Testa se existem seis botões de filtro', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    expect(screen.getByTestId(ALL_CATEGORIY)).toBeInTheDocument();
    // expect(screen.getByTestId(BREAKFAST_CATEGORY)).toBeInTheDocument();
  });

  it('Testa se renderiza Header', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    expect(screen.getByTestId(PAGE_TITLE_SELECTOR)).toBeInTheDocument();
  });

  it('Testa se renderiza Footer', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(INPUT_EMAIL_SELECTOR), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD_SELECTOR), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON_SELECTOR));

    expect(screen.getByTestId(FOOTER_SELECTOR)).toBeInTheDocument();
  });
});
