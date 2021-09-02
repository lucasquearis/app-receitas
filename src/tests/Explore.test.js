import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica a tela Explorar', () => {
  it('Verifica se existem 2 botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('Verifica os botões Explorar Comidas/Bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const buttonMeals = screen.getByRole('button', { name: /Explorar Comidas/i });
    expect(buttonMeals).toBeInTheDocument();

    const buttonDrinks = screen.getByRole('button', { name: /Explorar Bebidas/i });
    expect(buttonDrinks).toBeInTheDocument();
  });

  it('Verifica rota do botão Explorar Comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const button = screen.getByRole('button', { name: /Explorar Comidas/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Verifica rota do botão Explorar Bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const button = screen.getByRole('button', { name: /Explorar Bebidas/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
