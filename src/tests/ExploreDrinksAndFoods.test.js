import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const foodApi = 'https://www.themealdb.com/api/json/v1/1/random.php';
const drinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const exploreFood = '/explorar/comidas';
const exploreDrinks = '/explorar/bebidas';

const randomFood = {
  meals: [
    { idMeal: 53044 },
  ],
};

const randomDrink = {
  drinks: [
    { idDrink: 25 },
  ],
};

const fetch = (url) => Promise.resolve({
  json: () => {
    if (url === foodApi) {
      return Promise.resolve(randomFood);
    }
    if (url === drinkApi) {
      return Promise.resolve(randomDrink);
    }
  },
});

describe('Testa página de exploração por comida e bebida', () => {
  test('Testa botão "Por Ingredientes" da exploração por comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFood);
    const byIngredient = screen.getByRole('button', { name: 'Por Ingredientes' });
    expect(byIngredient).toBeInTheDocument();
    fireEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  test('Testa botão "Por Ingredientes" da exploração por bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinks);
    const byIngredient = screen.getByRole('button', { name: 'Por Ingredientes' });
    expect(byIngredient).toBeInTheDocument();
    fireEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  test('Testa botão "Por Local de Origem" da exploração por comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFood);
    const byOrigin = screen.getByRole('button', { name: 'Por Local de Origem' });
    expect(byOrigin).toBeInTheDocument();
    fireEvent.click(byOrigin);
    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  test('Testa botão "Por Local de Origem" da exploração por bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/area');
    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });

  test('Testa botão "Me Surpreenda" da exploração por comidas', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    history.push(exploreFood);
    const surprise = screen.getByRole('button', { name: 'Me Surpreenda!' });
    expect(surprise).toBeInTheDocument();
    await userEvent.click(surprise);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/comidas/25');
    });
  });
});
