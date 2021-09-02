import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Realiza todos os testes da página de Bebidas', () => {
  it('A tela de bebidas possui um header com os botões corretos', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Bebidas');
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('A barra de busca é renderizada ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    userEvent.click(getByTestId('search-top-btn'));

    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  it('A página renderiza inicialmente 12 Bebidas', async () => {
    const { getByTestId, findAllByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    const cardRegEx = /.-recipe-card/;
    const AMOUNT_OF_CARDS = 12;

    const cards = await findAllByTestId(cardRegEx);
    expect(cards).toHaveLength(AMOUNT_OF_CARDS);

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });

  it('Os botões de categoria são renderizados corretamente', () => {
    const { getByTestId, container, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    const categoryButtons = container.querySelectorAll('.category-buttons');

    const amountOfButtons = 6;
    const TIMEOUT = 1000;

    setTimeout(() => {
      expect(categoryButtons).toHaveLength(amountOfButtons);
    }, TIMEOUT);
  });
});
