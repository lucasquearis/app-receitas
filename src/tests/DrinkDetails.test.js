import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mockedFoods } from '../mocks/mockFood';
import { mockedSpecificDrink } from '../mocks/mockDrink';

const url = '/bebidas/17222';

jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
  { json: () => Promise.resolve(mockedSpecificDrink) },
)).mockImplementationOnce(() => Promise.resolve(
  { json: () => Promise.resolve((mockedFoods)) },
));

const update = () => Promise.resolve();

describe('Realiza os testes da pagina de Drink Details', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Verifica se todos os elementos estão na tela', async () => {
    await act(async () => {
      renderWithRouter(<App />, url);
    });

    await update();

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

    // Checa se os elementos existem
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

    // Checa se ao clicar no favorito, a imagem troca.
    userEvent.click(recipeFavorite);
    expect(recipeFavorite).not.toHaveAttribute('src', source);

    // Checa se o texto link copiado não é mostrado na tela..
    const linkCopiado = screen.queryByText(/link copiado!/i);
    expect(linkCopiado).not.toBeInTheDocument();

    // Checa se ao clicar em next a segunda comida não mostra mais e ao voltar continua la.
    userEvent.click(nextButton);
    expect(secondFood).not.toBeVisible();
    userEvent.click(previousButton);
    expect(secondFood).toBeVisible();
  });
});
