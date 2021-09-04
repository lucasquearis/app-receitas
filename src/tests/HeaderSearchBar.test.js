import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './renderWithRouter';

describe('Testa elementos na barra de busca', () => {
  test('testa todos os testIds', () => {
    renderWithRouter(<Header />);
    const magnifyBtn = screen.getByTestId('search-top-btn');
    userEvent.click(magnifyBtn);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
  });
  test('Testa endpoints da API', async () => {
    renderWithRouter(<Header />);
    const magnifyBtn = screen.getByTestId('search-top-btn');
    userEvent.click(magnifyBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'banana');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);
  });
});
