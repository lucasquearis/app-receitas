import { screen } from '@testing-library/react';
import React from 'react';
import FooterMenu from '../components/FooterMenu/FooterMenu';
import renderWithRouter from './renderWithRouter';

describe('19 - Verifica os elementos contidos no menu inferior.', () => {
  it('O menu inferior contem um "footer".', () => {
    renderWithRouter(<FooterMenu />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('O menu inferior contém um botão que redireciona para página de Drinks.', () => {
    renderWithRouter(<FooterMenu />);
    const buttonDrink = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
  });
  it('O menu inferior contém um botão que redireciona para página de Refeição.', () => {
    renderWithRouter(<FooterMenu />);
    const buttonFood = screen.getByTestId('food-bottom-btn');
    expect(buttonFood).toBeInTheDocument();
  });
  it('O menu inferior contém um botão que redireciona para página de Pesquisa.', () => {
    renderWithRouter(<FooterMenu />);
    const buttonExplore = screen.getByTestId('explore-bottom-btn');
    expect(buttonExplore).toBeInTheDocument();
  });
});
