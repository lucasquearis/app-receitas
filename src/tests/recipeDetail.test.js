import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

const NUMBER_EIGHT = 8;
const NUMBER_THREE = 3;

describe('Testando se a página de detalhes da receita', () => {
  global.fetch = jest.fn(async (url) => ({
    json: async () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
        return oneMeal;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return oneDrink;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return drinks;
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return meals;
      }
    },
  }));

  it('apresenta os elementos necessários quando é uma comida', async () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/comidas/52771' });

    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getAllByRole('listitem')).toHaveLength(NUMBER_EIGHT);
  });

  it('apresenta os elementos necessários quando é uma bebida', async () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/bebidas/178319' });

    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('Aquamarine');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getAllByRole('listitem')).toHaveLength(NUMBER_THREE);
  });
});
