import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, cleanup } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { MealsExplorer } from '../pages';
import recipe from './mocks/mealRecipe';

const exploreByIngredient = 'explore-by-ingredient';
const exploreByArea = 'explore-by-area';
const exploreSurprise = 'explore-surprise';

const fetchMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(recipe),
  }));
};

describe('Testa a página MealsExplorer', () => {
  beforeEach(cleanup);
  it('Apresenta todos os elementos esperados na página', async () => {
    await act(async () => {
      renderWithRouter(<MealsExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(screen.getByTestId(exploreByArea)).toBeInTheDocument();
    expect(screen.getByTestId(exploreSurprise)).toBeInTheDocument();
  });

  it('Os botões de exploração apresentam o conteúdo esperado', async () => {
    await act(async () => {
      renderWithRouter(<MealsExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient).innerHTML).toBe('Por Ingredientes');
    expect(screen.getByTestId(exploreByArea).innerHTML).toBe('Por Local de Origem');
    expect(screen.getByTestId(exploreSurprise).innerHTML).toBe('Me Surpreenda!');
  });

  it('O botão de explorar `Por Ingredientes` redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<MealsExplorer />);
      userEvent.click(screen.getByTestId(exploreByIngredient));
      const url = history.location.pathname;
      expect(url).toBe('/explorar/comidas/ingredientes');
    });
  });

  it('O botão de explorar `Por Local de Origem` redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<MealsExplorer />);
      userEvent.click(screen.getByTestId(exploreByArea));
      const url = history.location.pathname;
      expect(url).toBe('/explorar/comidas/area');
    });
  });

  it('O botão `Me Surpreenda` redireciona corretamente', async () => {
    let myHistory = {};
    await act(async () => {
      const { history } = renderWithRouter(<MealsExplorer />);
      myHistory = history;
      fetchMock();
    });
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(endpoint);
    const btnExploreByIngredients = screen.getByTestId(exploreSurprise);
    userEvent.click(btnExploreByIngredients);
    const url = myHistory.location.pathname;
    expect(url).toBe('/comidas/52771');
  });

  it('Retorna null quando a requisição falha', async () => {
    await act(async () => {
      renderWithRouter(<MealsExplorer />);
      fetch.mockImplementationOnce(() => Promise.reject());
    });
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    expect(global.fetch).toBeCalledWith(endpoint);
  });
});
