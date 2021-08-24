import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa SearchBar', () => {
  it('Should have search form', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchTopBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchTopBtn);

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

  it('Test input and radio buttons', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchTopBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchRadioName = screen.getByTestId('name-search-radio');
    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchRadioLetter = screen.getByTestId('first-letter-search-radio');

    fireEvent.change(searchInput, 'milk');
    expect(searchInput).toHaveTextContent('milk');
  });
});
