import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mockedSpecificFood } from '../mocks/mockFood';
import { mockedDrinks } from '../mocks/mockDrink';

const helpers = require('../auxiliar/auxiliarFunctions');

const url = '/comidas/52977';

// Recebi ajuda do colega Leo Ferreira para fazer o mock das fetchs para a api.
const mock = () => jest
  .spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
    { json: () => Promise.resolve(mockedSpecificFood) },
  )).mockImplementationOnce(() => Promise.resolve(
    { json: () => Promise.resolve((mockedDrinks)) },
  ));

// jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(
//   { json: () => Promise.resolve(mockedFood) },
// ));

describe('Realiza os testes da pagina de Food Details', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos estão na tela', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { name: /corba/i });
    const recipeShare = screen.getByRole('button', { name: /share/i });
    const recipeFavorite = screen.getByRole('button', { name: /fav/i });
    const recipeCategory = screen.getByRole('heading', { name: /side/i });
    const recipeLastIngredient = screen.getByTestId('12-ingredient-name-and-measure');
    const recipeInstruction = screen.getByTestId('instructions');
    const recipeVideo = screen.getByTitle(/recipe/i);
    const firstDrink = screen.getByText(/gg/i);
    const secondDrink = screen.getByText(/a1/i);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    const startButton = screen.getByRole('button', { name: /iniciar receita/i });

    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShare).toBeInTheDocument();
    expect(recipeFavorite).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeLastIngredient).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();
    expect(firstDrink).toBeVisible();
    expect(secondDrink).toBeVisible();
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });
  it('Checa se ao clicar no favorito, a imagem troca.', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const source = 'whiteHeartIcon.svg';

    const recipeFavorite = screen.getByRole('button', { name: /fav/i });
    expect(recipeFavorite).toHaveAttribute('src', source);
    userEvent.click(recipeFavorite);
    expect(recipeFavorite).not.toHaveAttribute('src', source);
  });
  it('Checa se ao clicar em compartilhar mostra o texto.', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    helpers.handleShare = jest.fn((func) => {
      func('Link copiado!');
    });

    const recipeShare = screen.getByRole('button', { name: /share/i });
    const linkCopiado = screen.queryByText(/link copiado!/i);
    expect(linkCopiado).not.toBeInTheDocument();
    userEvent.click(recipeShare);
    expect(helpers.handleShare).toBeCalledTimes(1);
  });
  it('Checa se todas as bebidas são mostradas corretamente.', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const firstDrink = screen.getByText(/gg/i);
    const nextButton = screen.getByRole('button', { name: /next/i });
    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(firstDrink).toBeVisible();
    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(firstDrink).not.toBeVisible();
    userEvent.click(previousButton);
    expect(firstDrink).toBeVisible();
  });
});
