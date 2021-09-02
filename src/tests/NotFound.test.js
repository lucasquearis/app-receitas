import React from 'react';
import { act, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa a página NotFound', () => {
  it('Verifica se é exibido o título NotFound', async () => {
    await act(async () => {
      renderWithRouter(<NotFound />);
    });
    const messageElement = screen.getByTestId('title-error');
    expect(messageElement).toBeInTheDocument();
    const messagemHeading = screen.getByRole(
      'heading',
      { name: /Not Found/i, level: 2 },
    );
    expect(messagemHeading).toBeInTheDocument();
  });
});
