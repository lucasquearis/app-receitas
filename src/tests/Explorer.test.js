import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Explorer } from '../pages';

describe('Testa a página de Explore', () => {
  it('Verifica se a página contém os elementos esperados', () => {
    renderWithRouter(<Explorer />);

    const exploreBtn = screen.getByTestId('explore-food');
    const exploreDrink = screen.getByTestId('explore-drinks');

    expect(exploreBtn).toBeInTheDocument();
    expect(exploreDrink).toBeInTheDocument();
  });
});
