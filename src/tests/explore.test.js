import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxRouter from './renderWithReduxRouter';

import { Explore } from '../pages';

const FOOD_BUTOON_TEST_ID = 'explore-food';
const DRINK_BUTOON_TEST_ID = 'explore-drinks';
const FOOD_BUTTON_TEXT_CONTENT = 'Explorar Comidas';
const DRINK_BUTTON_TEXT_CONTENT = 'Explorar Bebidas';

describe('Testando Tela de Explorar', () => {
  it('tem 01 botão para redirecionar para tela de explorar comida', async () => {
    const { history } = renderWithReduxRouter(<Explore />);

    const foodButton = screen.getByTestId(FOOD_BUTOON_TEST_ID);
    expect(foodButton).toBeInTheDocument();
    expect(foodButton).toHaveTextContent(FOOD_BUTTON_TEXT_CONTENT);
    userEvent.click(foodButton);
    const exploreFoodTitle = await screen.findByText(FOOD_BUTTON_TEXT_CONTENT); // modificar teste depois da página de Explorar Comidas ficar pronta
    expect(exploreFoodTitle).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('tem 01 botão para redirecionar para tela de explorar bebida', async () => {
    const { history } = renderWithReduxRouter(<Explore />);

    const drinksButton = screen.getByTestId(DRINK_BUTOON_TEST_ID);
    expect(drinksButton).toBeInTheDocument();
    expect(drinksButton).toHaveTextContent(DRINK_BUTTON_TEXT_CONTENT);
    userEvent.click(drinksButton);
    const exploreDrinkTitle = await screen.findByText(DRINK_BUTTON_TEXT_CONTENT); // modificar teste depois da página de Explorar Bebidas ficar pronta
    expect(exploreDrinkTitle).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
