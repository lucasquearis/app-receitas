import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mockedSpecificFood } from '../mocks/mockFood';

const url = '/comidas/52977/in-progress';

jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
  { json: () => Promise.resolve(mockedSpecificFood) },
));

const update = () => Promise.resolve();

describe('Realiza os testes da pagina de Food Progress', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos estão na tela', async () => {
    await act(async () => {
      renderWithRouter(<App />, url);
    });

    await update();

    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeName = screen.getByRole('heading', { name: /corba/i });
    const recipeShare = screen.getByRole('img', { name: /botao-compartilhar/i });
    const recipeFavorite = screen.getByRole('button', { name: /fav/i });
    const category = screen.getByRole('heading', { name: /side/i });
    const recipeInstruction = screen.getByTestId('instructions');
    const finishButton = screen.getByRole('button', { name: /finalizar receita/i });

    // Checa se os elementos existem
    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShare).toBeInTheDocument();
    expect(recipeFavorite).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(finishButton).toBeDisabled();

    // Marca todos os checkbox
    const MAX = 13;
    for (let i = 0; i < MAX; i += 1) {
      const checkBox = screen.getByTestId(`${i}-ingredient-step`);
      expect(checkBox).toBeInTheDocument();
      userEvent.click(checkBox);
    }

    expect(finishButton).toBeEnabled();

    // Checa se o texto link copiado não é mostrado na tela.
    const linkCopiado = screen.queryByText(/link copiado!/i);
    expect(linkCopiado).not.toBeInTheDocument();
  });
});
