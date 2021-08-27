import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxRouter from './renderWithReduxRouter';

import { Profile } from '../pages';


describe('testa se a Tela de Login', () => {
    it('contem o heading com texto Login', () => {
        const { history } = renderWithReduxAndRouter(<App />, {}, { route: '/perfil' });
      const headingLogin = screen.getByRole('heading', { name: /login/i });
      expect(headingLogin).toBeInTheDocument();
    });