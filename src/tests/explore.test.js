import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';

const FOOD_BUTTON_TEXT_CONTENT = 'Explorar Comidas';
const DRINK_BUTTON_TEXT_CONTENT = 'Explorar Bebidas';

describe('Testando Tela de Explorar', () => {
  it('tem 01 botão para redirecionar para tela de explorar comida', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/explorar' });

    const foodButton = screen.getByTestId('explore-food');
    expect(foodButton).toBeInTheDocument();
    expect(foodButton).toHaveTextContent(FOOD_BUTTON_TEXT_CONTENT);
    userEvent.click(foodButton);
    const exploreFoodTitle = await screen.findByTestId('explore-by-ingredient'); // modificar teste depois da página de Explorar Comidas ficar pronta
    expect(exploreFoodTitle).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('tem 01 botão para redirecionar para tela de explorar bebida', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/explorar' });

    const drinksButton = screen.getByTestId('explore-drinks');
    expect(drinksButton).toBeInTheDocument();
    expect(drinksButton).toHaveTextContent(DRINK_BUTTON_TEXT_CONTENT);
    userEvent.click(drinksButton);
    const exploreDrinkTitle = await screen.findByTestId('explore-by-ingredient'); // modificar teste depois da página de Explorar Bebidas ficar pronta
    expect(exploreDrinkTitle).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
