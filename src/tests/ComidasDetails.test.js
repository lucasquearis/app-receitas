import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ComidasDetails from '../pages/ComidasDetails';
import fetchMock from '../../cypress/mocks/fetch';

describe('Testes para a pagina de detalhes de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  it('Verifica se todos os elementos sao mostrados na tela', async () => {
    renderWithRouter(<ComidasDetails match={ { params: { id: '52771' } } } />);

    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('share-btn');
    await screen.findByTestId('favorite-btn');
    await screen.findByTestId('recipe-category');
    await screen.findByTestId('0-ingredient-name-and-measure');
    await screen.findByTestId('instructions');
    await screen.findByTestId('video');
    await screen.findByTestId('0-recomendation-card');
    await screen.findByTestId('start-recipe-btn');
  });
  it('Verifica se foram feitas duas requisicoes a API', () => {
  });
});
