import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Perfil from '../pages/Perfil';

describe('Testes para o Footer', () => {
  it('Verifica se os elementos estao presentes', () => {
    renderWithRouter(<Perfil />);
    const email = screen.getByTestId(/profile-email/i);
    const receitasFeitas = screen.getByTestId(/profile-done-btn/i);
    const receitasFavoritas = screen.getByTestId(/profile-favorite-btn/i);
    const sair = screen.getByTestId(/profile-logout-btn/i);

    expect(email).toBeInTheDocument();
    expect(receitasFavoritas).toBeInTheDocument();
    expect(receitasFeitas).toBeInTheDocument();
    expect(sair).toBeInTheDocument();
  });

