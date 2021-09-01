import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import fetch from '../../cypress/mocks/fetch';
// import oneDrink from '../../cypress/mocks/oneDrink';

const PUSH = '/explorar/bebidas';

describe('Verifica a tela Explorar Bebidas', () => {
  it('Verifica se existem 2 botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const two = 2;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(two);
  });

  it('Verifica os botões Ingredientes/Surpreenda', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const buttonIngredients = screen.getByRole('button', { name: /Por Ingredientes/i });
    expect(buttonIngredients).toBeInTheDocument();

    const buttonSurprise = screen.getByRole('button', { name: /Me Surpreenda!/i });
    expect(buttonSurprise).toBeInTheDocument();
  });

  it('Verifica rota do botão Ingredientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const button = screen.getByRole('button', { name: /Por Ingredientes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });

  // NAO SEI FAZER ESSE TESTE
  // it('Verifica rota do botão Surpreenda', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push(PUSH);

  //   global.fetch = jest.fn(fetch);

  //   const button = screen.getByRole('button', { name: /Me Surpreenda!/i });
  //   userEvent.click(button);
  //   const { pathname } = history.location;
  //   expect(await pathname).toBe('/bebidas/178319');
  // });
});
