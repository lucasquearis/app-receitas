import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('Testa SearchBar', () => {
  beforeEach(() => { render(<SearchBar />); });

  it(`13 - Implemente os elementos da barra
  de busca respeitando os atributos descritos no protótipo`, () => {
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchRadioName = screen.getByTestId('name-search-radio');
    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchRadioLetter = screen.getByTestId('first-letter-search-radio');
  });
});
