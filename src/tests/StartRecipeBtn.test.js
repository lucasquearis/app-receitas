import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import StartRecipeBtn from '../components/StartRecipeBtn';

describe('testa render do botao Start', () => {
  it('testa renderizacao do botao Continue', () => {
    renderWithRouter(<StartRecipeBtn pathname="/comidas/53026" />);
    const continueBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(continueBtn);
  });
});
