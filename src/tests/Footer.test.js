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
});