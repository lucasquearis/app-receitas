import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('13 -Implemente os elementos da barra de busca respeitando os atributos', () => {
  it('O input de busca deve estar no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('search-input')).toBeInTheDocument();
  });
  it('O radio button de busca de ingrediente está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('ingredient-search-radio')).toBeInTheDocument();
  });
  it('O radio button de busca por nome está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('name-search-radio')).toBeInTheDocument();
  });
  it('O radio button de busca da primeira letra está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('first-letter-search-radio')).toBeInTheDocument();
  });
  it('O botão de busca está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
