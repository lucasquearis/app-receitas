import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import ContinueRecipeBtn from '../components/ContinueRecipeBtn';

describe('testa render do botao', () => {
  it('testa renderizacao do botao Continue', () => {
    renderWithRouter(<ContinueRecipeBtn pathname="/comidas/53026" />);
    const continueBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(continueBtn);
  });
});
