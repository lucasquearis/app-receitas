import React from 'react';
import { screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';

const SEARCH_TOP_BTN_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const INGREDIENT_RADIO_TEST_ID = 'ingredient-search-radio';
const NAME_RADIO_TEST_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';
const SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

describe('Testando se a barra de busca', () => {
  it('tem todos os elementos solicitados', () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN_TEST_ID);
    userEvent.click(searchButton);
    expect(screen.getByTestId(SEARCH_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(INGREDIENT_RADIO_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_RADIO_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  it('quando clica no botão apresenta o componente e quando clica novamente some', () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN_TEST_ID);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchByNameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    expect(searchInput).toBeInTheDocument();
    expect(searchByNameRadio).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
    expect(searchByNameRadio).not.toBeInTheDocument();
  });

  it(
    'quando na página de comida busca na Api de comida, respeitando os filtros',
    async () => {
      renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'soup');
      userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('Leblebi Soup');

      expect(screen.getByTestId('1-card-name')).toHaveTextContent('Red Peas Soup');
      expect(screen.getByTestId('4-card-name')).toHaveTextContent('French Onion Soup');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'Chicken');
      userEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('Brown Stew Chicken');

      expect(screen.getByTestId('1-card-name'))
        .toHaveTextContent('Chicken & mushroom Hotpot');
      expect(screen.getByTestId('4-card-name')).toHaveTextContent('Chicken Congee');
    },
  );

  it('quando na página de bebida busca na Api de bebida, respeitando os filtros',
    async () => {
      renderWithReduxAndRouter(<App />, {}, { route: '/bebidas' });

      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'Light rum');
      userEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('151 Florida Bushwacker');

      expect(screen.getByTestId('2-card-name'))
        .toHaveTextContent('3-Mile Long Island Iced Tea');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'Aquamarine');
      userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByTestId('recipe-category');

      expect(screen.getByTestId('0-ingredient-name-and-measure'))
        .toHaveTextContent('2 oz of Hpnotiq');
    });

  it('dispara um alerta quando a busca não retornar nada', async () => {
    global.alert = jest.fn(() => {});

    renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'xablau');
    userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

    await waitForDomChange();
    expect(global.alert).toHaveBeenCalled();
  });
});
