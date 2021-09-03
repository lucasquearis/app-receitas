import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mockedFoods } from '../mocks/mockFood';
import { mockedSpecificDrink } from '../mocks/mockDrink';

const helpers = require('../auxiliar/auxiliarFunctions');

const url = '/bebidas/17222';

const mock = () => jest
  .spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
    { json: () => Promise.resolve(mockedSpecificDrink) },
  )).mockImplementationOnce(() => Promise.resolve(
    { json: () => Promise.resolve((mockedFoods)) },
  ));

describe('Realiza os testes da pagina de Drink Details', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos estão na tela', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const source = 'whiteHeartIcon.svg';

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { name: /a1/i });
    const recipeShare = screen.getByRole('button', { name: /share/i });
    const recipeFavorite = screen.getByRole('button', { name: /fav/i });
    const alcoholic = screen.getByRole('heading', { name: /alcoholic/i });
    const recipeLastIngredient = screen.getByTestId('3-ingredient-name-and-measure');
    const recipeInstruction = screen.getByTestId('instructions');
    const firstFood = screen.getByText(/corba/i);
    const secondFood = screen.getByText(/burek/i);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    const startButton = screen.getByRole('button', { name: /iniciar receita/i });

    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShare).toBeInTheDocument();
    expect(recipeFavorite).toBeInTheDocument();
    expect(alcoholic).toBeInTheDocument();
    expect(recipeLastIngredient).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(firstFood).toBeVisible();
    expect(secondFood).toBeVisible();
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(recipeFavorite).toHaveAttribute('src', source);
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

    const secondFood = screen.getByText(/burek/i);
    const nextButton = screen.getByRole('button', { name: /next/i });
    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(secondFood).toBeVisible();
    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(secondFood).not.toBeVisible();
    userEvent.click(previousButton);
    expect(secondFood).toBeVisible();
  });
});
