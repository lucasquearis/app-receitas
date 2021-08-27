import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import recipe from './mocks/mealRecipe';

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

  it('ações da lista de ingredientes', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
    });
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
    const list = await screen.findByRole('list');
    expect(list.childNodes.length).toBe(INGREDIENTS_LIST.length);

    const li0 = screen.getByLabelText(INGREDIENTS_LIST[0]);
    userEvent.click(li0);
    expect(li0).toBeChecked();
    userEvent.click(li0);
    expect(li0).not.toBeChecked();

    const li1 = screen.getByLabelText(INGREDIENTS_LIST[1]);
    userEvent.click(li1);
    expect(li1).toBeChecked();
    userEvent.click(li1);
    expect(li1).not.toBeChecked();

    const li2 = screen.getByLabelText(INGREDIENTS_LIST[2]);
    userEvent.click(li2);
    expect(li2).toBeChecked();
    userEvent.click(li2);
    expect(li2).not.toBeChecked();
  });

  it('botao de finalizar', async () => {
    await act(async () => {
      renderWithRouter(<App />, PATH);
    });
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
    const finishBtn = await screen.findByRole('button', { name: /finalizar/i });
    expect(finishBtn).toBeDisabled();

    const li0 = screen.getByLabelText(INGREDIENTS_LIST[0]);
    const li1 = screen.getByLabelText(INGREDIENTS_LIST[1]);
    const li2 = screen.getByLabelText(INGREDIENTS_LIST[2]);
    userEvent.click(li0);
    expect(li0).toBeChecked();

    userEvent.click(li1);
    expect(li1).toBeChecked();

    userEvent.click(li2);
    expect(li2).toBeChecked();

    userEvent.click(li0);
    userEvent.click(li1);
    userEvent.click(li2);
    expect(finishBtn).toBeDisabled();

    INGREDIENTS_LIST.forEach((ingredient) => {
      const ingInput = screen.getByLabelText(ingredient);
      userEvent.click(ingInput);
    });

    expect(finishBtn).toBeEnabled();
  });

  it('a rota deve ser mudada ao clicar em finalizar', async () => {

  });
});
