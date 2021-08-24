import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Testes para o Footer', () => {
  it('Verifica se os elementos estao presentes', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId(/footer/i);
    const mealIcon = screen.getByTestId(/food-bottom-btn/i);
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    const exploreIcon = screen.getByTestId(/explore-bottom-btn/i);

    expect(footer).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
  });

  it('Verifica se ao clicar no icone de bebidas vai a pagina correta', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    userEvent.click(drinkIcon);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/bebidas');
  });

  it('Verifica se ao clicar no icone de comidas vai a pagina correta', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealIcon = screen.getByTestId(/food-bottom-btn/i);
    userEvent.click(mealIcon);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/comidas');
  });

  it('Verifica se ao clicar no icone de explorar vai a pagina correta', () => {
    const { history } = renderWithRouter(<Footer />);
    const exploreIcon = screen.getByTestId(/explore-bottom-btn/i);
    userEvent.click(exploreIcon);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/explorar');
  });
});