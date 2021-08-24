import { screen } from '@testing-library/react';
import React from 'react';
import FooterMenu from '../components/FooterMenu';
import renderWithRouter from './renderWithRouter';

describe('19 - Verifica os elementos contidos no menu inferior.', () => {
  it('O menu inferior contem um "footer".', () => {
    renderWithRouter(<FooterMenu />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
