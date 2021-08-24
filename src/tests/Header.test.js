// vitals
import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './helpers/renderWithRouter';
// components
import App from '../App';

const PROFILE_TOP_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';

const possiblePaths = [
  '/comidas',
  '/bebidas',
  '/comidas/id',
  '/bebidas/id',
  '/comidas/id/in-progress',
  '/bebidas/id/in-progress',
  '/explorar',
  '/explorar/comidas',
  '/explorar/bebidas',
  '/explorar/comidas/ingredientes',
  '/explorar/bebidas/ingredientes',
  '/explorar/comidas/area',
  '/perfil',
  '/receitas-feitas',
  '/receitas-favoritas',
];

describe('Verifica se o Header', () => {
  describe('Contém os seguintes data-testid:', () => {
    it('profile-top-btn', () => {
      renderWithRouter(<App />);
      const target = screen.getByTestId(PROFILE_TOP_BTN);
      expect(target).toBeInTheDocument();
    });
    it('page-title', () => {
      renderWithRouter(<App />);
      const target = screen.getByTestId(PAGE_TITLE);
      expect(target).toBeInTheDocument();
    });
    it('search-top-btn', () => {
      const history = createMemoryHistory();
      renderWithRouter(<App />);
      history.push('/comidas');

      const target = screen
        .getByAltText('Ícone que indica o botão pra ativar a barra de busca');
      expect(target).toBeDefined();
    });
  });
});
