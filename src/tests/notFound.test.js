import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';

describe('Testando se a página notFound', () => {
  it('é carregada quando a URL é errada', () => {
    renderWithReduxAndRouter(<App />, {}, { route: '/xablau' });

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
  });
});
