import React from 'react';
import { screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import meals from '../../cypress/mocks/meals';
import soupMeals from '../../cypress/mocks/soupMeals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import mealsCategories from '../../cypress/mocks/mealCategories';
import mealsByFirstLetter from './mocks/mealsByFirstLetter';
import drinks from '../../cypress/mocks/drinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinksByFirstLetter from './mocks/drinksByFirstLetter';

const SEARCH_TOP_BTN_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const INGREDIENT_RADIO_TEST_ID = 'ingredient-search-radio';
const NAME_RADIO_TEST_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';
const SEARCH_BUTTON_TEST_ID = 'exec-search-btn';
const ONE_CARD_NAME_TEST_ID = '1-card-name';
const TWO_CARD_NAME_TEST_ID = '2-card-name';
const FOUR_CARD_NAME_TEST_ID = '4-card-name';

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
      global.fetch = jest.fn(async (url) => ({
        json: async () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
            return meals;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') {
            return soupMeals;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
            return mealsByIngredient;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
            return mealsByFirstLetter;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
            return mealsCategories;
          }
        },
      }));
      renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'soup');
      userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('Leblebi Soup');

      expect(screen.getByTestId(ONE_CARD_NAME_TEST_ID))
        .toHaveTextContent('Red Peas Soup');
      expect(screen.getByTestId(FOUR_CARD_NAME_TEST_ID))
        .toHaveTextContent('French Onion Soup');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'Chicken');
      userEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('Brown Stew Chicken');

      expect(screen.getByTestId(ONE_CARD_NAME_TEST_ID))
        .toHaveTextContent('Chicken & mushroom Hotpot');
      expect(screen.getByTestId(FOUR_CARD_NAME_TEST_ID))
        .toHaveTextContent('Chicken Congee');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'a');
      userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      expect(await screen.findByTestId('0-card-name'))
        .toHaveTextContent('Apple Frangipan Tart');
      expect(screen.getByTestId(TWO_CARD_NAME_TEST_ID)).toHaveTextContent('Apam balik');
    },
  );

  it('quando na página de bebida busca na Api de bebida, respeitando os filtros',
    async () => {
      global.fetch = jest.fn(async (url) => ({
        json: async () => {
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return drinks;
          }
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') {
            return ginDrinks;
          }
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
            return drinksByIngredient;
          }
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') {
            return drinksByFirstLetter;
          }
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
            return drinkCategories;
          }
        },
      }));
      renderWithReduxAndRouter(<App />, {}, { route: '/bebidas' });

      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'gin');
      userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('Gin Fizz');

      expect(screen.getByTestId(ONE_CARD_NAME_TEST_ID)).toHaveTextContent('Gin Sour');
      expect(screen.getByTestId(FOUR_CARD_NAME_TEST_ID)).toHaveTextContent('Gin Sling');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'Light rum');
      userEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      await screen.findByText('151 Florida Bushwacker');

      expect(screen.getByTestId(TWO_CARD_NAME_TEST_ID))
        .toHaveTextContent('3-Mile Long Island Iced Tea');

      userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'a');
      userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID));
      userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

      expect(await screen.findByTestId('0-card-name'))
        .toHaveTextContent('A1');
      expect(screen.getByTestId(TWO_CARD_NAME_TEST_ID)).toHaveTextContent('Ace');
    });

  it('dispara um alerta quando a busca não retornar nada', async () => {
    global.alert = jest.fn(() => {});
    global.fetch = jest.fn(mockFetch);
    renderWithReduxAndRouter(<App />, {}, { route: '/comidas' });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_TEST_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_TEST_ID), 'xablau');
    userEvent.click(screen.getByTestId(NAME_RADIO_TEST_ID));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON_TEST_ID));

    await waitForDomChange();
    expect(global.alert).toHaveBeenCalled();
  });
});
