import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { DrinksExplorer } from '../pages';
import recipe from './mocks/drinkRecipe';

const exploreByIngredient = 'explore-by-ingredient';
const exploreSurprise = 'explore-surprise';

const fetchMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(recipe),
  }));
};

describe('Testa a página MealsExplorer', () => {
  it('Apresenta todos os elementos esperados na página', async () => {
    await act(async () => {
      renderWithRouter(<DrinksExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(screen.queryByTestId('explore-by-area')).not.toBeInTheDocument();
    expect(screen.getByTestId(exploreSurprise)).toBeInTheDocument();
  });

  it('Os botões de exploração apresentam o conteúdo esperado', async () => {
    await act(async () => {
      renderWithRouter(<DrinksExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient).innerHTML).toBe('Por Ingredientes');
    expect(screen.getByTestId(exploreSurprise).innerHTML).toBe('Me Surpreenda!');
  });

  it('O botão de explorar por ingredientes redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<DrinksExplorer />);
      const btnExploreByIngredients = screen.getByTestId(exploreByIngredient);
      userEvent.click(btnExploreByIngredients);
      const url = history.location.pathname;
      expect(url).toBe('/explorar/bebidas/ingredientes');
    });
  });

  it('O botão `Me Surpreenda` redireciona corretamente', async () => {
    let myHistory = {};
    await act(async () => {
      const { history } = renderWithRouter(<DrinksExplorer />);
      myHistory = history;
      fetchMock();
    });
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(endpoint);
    const btnExploreByIngredients = screen.getByTestId(exploreSurprise);
    userEvent.click(btnExploreByIngredients);
    const url = myHistory.location.pathname;
    expect(url).toBe('/bebidas/13501');
  });

  it('Retorna null quando a requisição falha', async () => {
    await act(async () => {
      renderWithRouter(<DrinksExplorer />);
      fetch.mockImplementationOnce(() => Promise.reject());
    });
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    expect(global.fetch).toBeCalledWith(endpoint);
  });
});
