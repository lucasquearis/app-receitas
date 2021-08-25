import React from 'react';
import { cleanup } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from '../services/renderWithRouter';

const DATA_TEST_ID_DONE_RECIPE = 'profile-done-btn';
const DATA_TEST_ID_FAV_RECIPE = 'profile-favorite-btn';
const DATA_TEST_ID_LOGOUT = 'profile-logout-btn';
// const DATA_TEST_ID_EMAIL = 'profile-email';

afterEach(cleanup);

describe('Verifica ids em elementos do Perfil', () => {
  it('Verifica id do botão "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const button = getByTestId(DATA_TEST_ID_DONE_RECIPE);
    expect(button).toBeInTheDocument();
  });

  it('Verifica id do botão "Receitas Favoridas"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const button = getByTestId(DATA_TEST_ID_FAV_RECIPE);
    expect(button).toBeInTheDocument();
  });

  it('Verifica id do botão "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const button = getByTestId(DATA_TEST_ID_LOGOUT);
    expect(button).toBeInTheDocument();
  });
});

// describe('Varifica informações do LocalStorage', () => {
//   it('Varifica se email armazenado no localStorage é renderizado na tela', () => {
//     const { getByTestId } = renderWithRouter(<Profile />);
//     const email = getByTestId(DATA_TEST_ID_EMAIL);
//     expect(email).toBeInTheDocument();
//     expect(email).toBeVisible();
//   });
// });
