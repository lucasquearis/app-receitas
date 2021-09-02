import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const EXPLORE_PAGE_PATH = '/explorar/bebidas';

describe('Realiza todos os testes da página de Explorar bebidas', () => {
  it('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Explorar Bebidas');
  });

  it('Testa botão de busca por ingrediente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    const exploreByIngredientBtn = getByTestId('explore-by-ingredient');

    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreByIngredientBtn).toHaveTextContent('Por Ingredientes');

    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  it('Testa botão de receita aleatória', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    const exploreSurpriseBtn = getByTestId('explore-surprise');

    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toHaveTextContent('Me Surpreenda!');

    userEvent.click(exploreSurpriseBtn);

    expect(history.location.pathname).toBe('/bebidas/');
  });
});
