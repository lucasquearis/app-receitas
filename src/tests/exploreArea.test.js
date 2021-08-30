import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';

const TWENTY_FIVE = 25;
const FIVE = 5;
const TWELVE = 12;

describe('Testando se a Tela de Explorar por Area', () => {
  it('tem os elementos necessários', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithReduxAndRouter(<App />, {}, { route: '/explorar/comidas/area' });

    expect(await screen.findByTestId('explore-by-area-dropdown')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(TWENTY_FIVE);
    expect(screen.getAllByAltText('Imagem da Comida')).toHaveLength(TWELVE);
  });

  it('muda as receitas apresentadas quando selecionamos uma área', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithReduxAndRouter(<App />, {}, { route: '/explorar/comidas/area' });

    userEvent
      .selectOptions(await screen.findByTestId('explore-by-area-dropdown'), ['Japanese']);
    expect(await screen.findAllByAltText('Imagem da Comida')).toHaveLength(FIVE);
    expect(screen.getByTestId('1-card-name')).toHaveTextContent('Honey Teriyaki Salmon');
    expect(screen.getByTestId('4-card-name')).toHaveTextContent('Yaki Udon');
  });
});
