import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import Foods from '../pages/foods/Foods';
import Drinks from '../pages/drinks/Drinks';
import Perfil from '../pages/perfil/Perfil';

import { renderWithRouterAndStore } from './testConfig';

describe('não sei oque escrever pq o header da trybe ta esquisito', () => {
  test(' Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    renderWithRouterAndStore(<Foods />, '/comidas');
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(searchBar).not.toBeInTheDocument();

    const titleHead = screen.getByTestId('page-title');
    expect(titleHead).toBeInTheDocument();
    expect(titleHead).toHaveTextContent('Comidas');

    const ProfilePicture = screen.getByTestId('profile-top-btn');
    expect(ProfilePicture).toBeInTheDocument();
  });

  test('should ', () => {
    renderWithRouterAndStore(<Perfil />, '/perfil');
  });
});

describe('testa a funcionalidade da barra de navegação', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('verifica a existencia dos botoes da barra de navegação', () => {
    renderWithRouterAndStore(<Foods />, '/comidas');

    const BUTTON_ALL_TEST_ID = screen.findByTestId('All-category-filter');
    const BUTTON_BEEF_TEST_ID = screen.findByTestId('Beef-category-filter');
    const BUTTON_BREAKFAST_TEST_ID = screen.findByTestId('Breakfast-category-filter');
    const BUTTON_CHIKEN_TEST_ID = screen.findByTestId('Chicken-category-filter');
    const BUTTON_DESERT_TEST_ID = screen.findByTestId('Dessert-category-filter');
    const BUTTON_GOAT_TEST_ID = screen.findByTestId('Goat-category-filter');

    awaitFor(expect(BUTTON_ALL_TEST_ID)).toBeInTheDocument();
    expect(BUTTON_BEEF_TEST_ID).toBeInTheDocument();
    expect(BUTTON_BREAKFAST_TEST_ID).toBeInTheDocument();
    expect(BUTTON_CHIKEN_TEST_ID).toBeInTheDocument();
    expect(BUTTON_DESERT_TEST_ID).toBeInTheDocument();
    expect(BUTTON_GOAT_TEST_ID).toBeInTheDocument();
  });
});
