import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import recipes from './mocks/recipesMock';

const TYPE_OPTIONS = ['All', 'Food', 'Drink'];
const MEALS_QUANTITY = 4;
const DRINKS_QUANTITY = 3;
const ALL_QUANTITY = 7;
const MEALS_NAMES = ['Corba', 'Poutine', 'Big Mac', 'Wontons'];
const DRINKS_NAMES = ['Kir', 'AT&T', 'H.D.'];
const ALL_NAMES = ['Corba', 'Kir', 'Poutine', 'AT&T', 'Big Mac', 'H.D.', 'Wontons'];

Object.assign(navigator, { clipboard: { writeText: () => {} } });

const clipboardMock = () => jest.spyOn(navigator.clipboard, 'writeText');

describe('Testa a página de receitas feitas', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    jest.clearAllMocks();
  });

  afterEach(() => localStorage.clear());

  it('Verifica se todas as receitas e suas informações são exibidas'
      + ' corretamente', async () => {
    await act(async () => {
      renderWithRouter(<DoneRecipes />);
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const RECIPES_QUANTITY = doneRecipes.length;
    for (let index = 0; index < RECIPES_QUANTITY; index += 1) {
      const recipeImage = screen.getByTestId(`${index}-horizontal-image`);
      expect(recipeImage).toBeInTheDocument();
      const recipeCategory = screen.getByTestId(`${index}-horizontal-top-text`);
      expect(recipeCategory).toBeInTheDocument();
      const recipeShareIcon = screen.getByTestId(`${index}-horizontal-share-btn`);
      expect(recipeShareIcon).toBeInTheDocument();
      const recipeName = screen.getByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      const recipeDate = screen.getByTestId(`${index}-horizontal-done-date`);
      expect(recipeDate).toBeInTheDocument();
      if (doneRecipes[index].tags.length > 0) {
        for (let indexTag = 0; indexTag < 2; indexTag += 1) {
          if (doneRecipes[index].tags[indexTag] !== undefined) {
            const tagId = `${index}-${doneRecipes[index].tags[indexTag]}-horizontal-tag`;
            const recipeTag = screen.getByTestId(tagId);
            expect(recipeTag).toBeInTheDocument();
          }
        }
      }
    }
  });

  it('Verifica se as opções de filtro são exibidas corretamente', async () => {
    await act(async () => {
      renderWithRouter(<DoneRecipes />);
    });

    TYPE_OPTIONS.forEach((type) => {
      const typeButton = screen.getByTestId(`filter-by-${type.toLowerCase()}-btn`);
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('Verifica se as opções de filtro funcionam corretamente', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<DoneRecipes />);
    });

    const mealButton = await screen.getByRole('button', { name: /Food/i });
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);

    await act(() => firstPromise);
    const secondPromise = Promise.resolve();

    for (let index = 0; index < MEALS_QUANTITY; index += 1) {
      const mealName = screen.getByTestId(`${index}-horizontal-name`);
      expect(mealName).toHaveTextContent(MEALS_NAMES[index]);
    }

    const drinkButton = await screen.getByRole('button', { name: /Drink/i });
    expect(drinkButton).toBeInTheDocument();
    userEvent.click(drinkButton);

    await act(() => secondPromise);
    const thirdPromise = Promise.resolve();

    for (let index = 0; index < DRINKS_QUANTITY; index += 1) {
      const drinkName = screen.getByTestId(`${index}-horizontal-name`);
      expect(drinkName).toHaveTextContent(DRINKS_NAMES[index]);
    }

    const allButton = await screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    await act(() => thirdPromise);

    for (let index = 0; index < ALL_QUANTITY; index += 1) {
      const allName = screen.getByTestId(`${index}-horizontal-name`);
      expect(allName).toHaveTextContent(ALL_NAMES[index]);
    }
  });

  clipboardMock();
  it('Verifica se ao clicar no botão de compartilhar é exibida a mensagem'
      + ' de aviso', async () => {
    const firstPromise = Promise.resolve();

    await act(async () => {
      renderWithRouter(<DoneRecipes />);
    });

    const shareButton = await screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);

    await act(() => firstPromise);

    const urlCopied = 'http://localhost:3000/comidas/52977';
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(urlCopied);
  });

  it('Verifica se nada será exibido se nenhuma receita tiver sido'
  + ' realizada', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(null));

    await act(async () => {
      renderWithRouter(<DoneRecipes />);
    });

    const firstButton = screen.queryByText('All');
    expect(firstButton).toBeInTheDocument();

    const firstRecipe = screen.queryByTestId('0-horizontal-name');
    expect(firstRecipe).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar na imagem ou nome da receita, o usuário é redirecionado'
      + ' para a tela de detalhes da receita', async () => {
    let myHistory = {};

    await act(async () => {
      const { history } = renderWithRouter(<DoneRecipes />);
      myHistory = history;
    });

    const firstRecipe = await screen.getByTestId('0-horizontal-image');
    userEvent.click(firstRecipe);

    const url = myHistory.location.pathname;
    expect(url).toBe('/comidas/52977');
  });
});
