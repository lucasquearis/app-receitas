import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testConfig';
import Profile from '../pages/perfil/Profile';

const testHistory = createMemoryHistory({ initialEntries: ['/perfil'] });
const PROFILE_EMAIL = 'profile-email';
const DONE_RECIPES_BTN = 'profile-done-btn';
const FAV_RECIPES_BTN = 'profile-favorite-btn';
const LOG_OUT_BTN = 'profile-logout-btn';

describe('Testa a tela de receitas feitas', () => {
  it('Testa se a tela renderiza os componentes corretamente', () => {
    const {
      getByTestId,
    } = renderWithRouterAndStore(<Profile />, testHistory);
    const profileEmail = getByTestId(PROFILE_EMAIL);
    const doneRecipesBtn = getByTestId(DONE_RECIPES_BTN);
    const favRecipesBtn = getByTestId(FAV_RECIPES_BTN);
    const logOutBtn = getByTestId(LOG_OUT_BTN);

    expect(profileEmail).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favRecipesBtn).toBeInTheDocument();
    expect(logOutBtn).toBeInTheDocument();
  });

  it('Testa se o localStorage é limpo ao clicar em sair', () => {
    jest.spyOn(Storage.prototype, 'clear');

    const {
      getByTestId,
    } = renderWithRouterAndStore(<Profile />, testHistory);
    const logOutBtn = getByTestId(LOG_OUT_BTN);

    fireEvent.click(logOutBtn);

    expect(localStorage.clear).toBeCalled();
  });
});
