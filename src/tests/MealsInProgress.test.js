import React from 'react';
// import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import recipe from './mocks/recipe';

const PATH = '/comidas/52771/in-progress';
const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const INGREDIENTS_LIST = [
  'penne rigate',
  'olive oil',
  'garlic',
  'chopped tomatoes',
  'red chile flakes',
  'italian seasoning',
  'basil',
  'Parmigiano-Reggiano',
];
const TITLE = recipe.meals[0].strMeal;
const CATEGORY = recipe.meals[0].strCategory;
const INSTRUCTIONS = recipe.meals[0].strInstructions;
const IMG_SRC = recipe.meals[0].strMealThumb;

const fetchMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(recipe),
  }));
};

describe('testa pagina de receita em progresso', () => {
  beforeAll(fetchMock);
  beforeEach(cleanup);

  it('path da pagina', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />, PATH);
      expect(history.location.pathname).toBe('/comidas/52771/in-progress');
    });
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
  });

  it('elementos da pagina', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
    });
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);

    await screen.findByText(TITLE);
    await screen.findByText(CATEGORY);
    await screen.findByText(INSTRUCTIONS);
    await screen.findByRole('img', { src: IMG_SRC, alt: TITLE });
  });

  it('lista de ingredientes', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
    });
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
    const list = await screen.findByRole('list');
    expect(list.childNodes.length).toBe(INGREDIENTS_LIST.length);

    INGREDIENTS_LIST.forEach((item) => {
      screen.getByText(item);
    });
  });
});
