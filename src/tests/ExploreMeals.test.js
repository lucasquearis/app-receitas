import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import fetch from '../../cypress/mocks/fetch';
// import oneMeal from '../../cypress/mocks/oneMeal';

const PUSH = '/explorar/comidas';

describe('Verifica a tela Explorar Comidas', () => {
  it('Verifica se existem 3 botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const three = 3;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(three);
  });

  it('Verifica os botões Ingredientes/Origem/Surpreenda', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const buttonIngredients = screen.getByRole('button', { name: /Por Ingredientes/i });
    expect(buttonIngredients).toBeInTheDocument();

    const buttonArea = screen.getByRole('button', { name: /Por Local de Origem/i });
    expect(buttonArea).toBeInTheDocument();

    const buttonSurprise = screen.getByRole('button', { name: /Me Surpreenda!/i });
    expect(buttonSurprise).toBeInTheDocument();
  });

  it('Verifica rota do botão Ingredientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const button = screen.getByRole('button', { name: /Por Ingredientes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Verifica rota do botão Origem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH);

    const button = screen.getByRole('button', { name: /Por Local de Origem/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });

  // NAO SEI FAZER ESSE TESTE
  // it('Verifica rota do botão Surpreenda', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push(PUSH);

  //   global.fetch = jest.fn(fetch);

  //   const button = screen.getByRole('button', { name: /Me Surpreenda!/i });
  //   userEvent.click(button);
  //   const { pathname } = history.location;
  //   expect(await pathname).toBe('/comidas/52771');
  // });
});
