import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Foods from '../pages/Foods';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa SearchBar', () => {
  beforeEach(() => { renderWithRouter(<Foods />); });

  it('Should have search form', () => {
    fireEvent.click(screen.getByTestId('search-top-btn'));
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchRadioName = screen.getByTestId('name-search-radio');
    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchRadioLetter = screen.getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(searchRadioName).toBeInTheDocument();
    expect(searchRadioIngredient).toBeInTheDocument();
    expect(searchRadioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});
