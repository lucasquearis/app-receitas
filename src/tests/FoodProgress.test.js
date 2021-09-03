import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mockedSpecificFood } from '../mocks/mockFood';

const helpers = require('../auxiliar/auxiliarFunctions');

const url = '/comidas/52977/in-progress';
const secUrl = '/comidas/53060/in-progress';
// const thirdUrl = '/comidas/52978/in-progress';

const mock = () => jest
  .spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
    { json: () => Promise.resolve(mockedSpecificFood) },
  ));

describe('Realiza os testes da pagina de Food Progress', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos estão na tela', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { name: /corba/i });
    const recipeShare = screen.getByRole('button', { name: /share/i });
    const recipeFavorite = screen.getByRole('button', { name: /fav/i });
    const category = screen.getByRole('heading', { name: /side/i });
    const recipeInstruction = screen.getByTestId('instructions');
    const finishButton = screen.getByRole('button', { name: /finalizar receita/i });

    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShare).toBeInTheDocument();
    expect(recipeFavorite).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(finishButton).toBeDisabled();
  });
  it('Marcar todos os checkboxes deve liberar o botão para ser clicado.', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const finishButton = screen.getByRole('button', { name: /finalizar receita/i });
    expect(finishButton).toBeDisabled();

    const MAX = 13;
    for (let i = 0; i < MAX; i += 1) {
      const checkBox = screen.getByTestId(`${i}-ingredient-step`);
      expect(checkBox).toBeInTheDocument();
      userEvent.click(checkBox);
    }

    expect(finishButton).toBeEnabled();
  });
  it('Checa se funciona corretamente o botão de share.', async () => {
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
    const newText = screen.getByText(/link copiado!/i);
    expect(newText).toBeInTheDocument();
  });
  it('Checa se funciona corretamento o botão de favoritar', async () => {
    mock();
    renderWithRouter(<App />, url);
    await waitForDomChange();

    const source = 'whiteHeartIcon.svg';

    const favButton = screen.getByRole('button', { name: /fav/i });
    expect(favButton).toHaveAttribute('src', source);
    userEvent.click(favButton);
    expect(favButton).not.toHaveAttribute('src', source);
  });
  it('Checa se redireciona para outra pagina ao clicar em finalizar.', async () => {
    mock();
    renderWithRouter(<App />, secUrl);
    await waitForDomChange();

    const finishButton = screen.getByRole('button', { name: /finalizar receita/i });
    expect(finishButton).toBeDisabled();

    const MAX = 13;
    for (let i = 0; i < MAX; i += 1) {
      const checkBox = screen.getByTestId(`${i}-ingredient-step`);
      expect(checkBox).toBeInTheDocument();
      userEvent.click(checkBox);
    }

    expect(finishButton).toBeEnabled();

    userEvent.click(finishButton);
    expect(finishButton).not.toBeInTheDocument();
  });
});
