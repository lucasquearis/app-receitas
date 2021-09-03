import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Area from '../pages/Area';

const URL = '/explorar/comidas/area';
const URLBEBIDA = '/explorar/bebidas/area';

describe('Testa pagina de explorar comida por area', () => {
  it('Verifica explorar/bebidas/area', () => {
    const { history } = renderWithRouter(<Area />, URLBEBIDA);
    history.push(URLBEBIDA);
    const path = history.location.pathname;
    expect(path).toBe(URLBEBIDA);
  });

  it('Verifica loading', () => {
    renderWithRouter(<Area />, URL);
    const Loading = screen.getByText('Loading...');
    expect(Loading).toBeInTheDocument();
  });

  it('Testa se rota esta correta', () => {
    const { history } = renderWithRouter(<Area />, URL);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });
  it('Testa se o dropdown menu funciona corretamente', async () => {
    renderWithRouter(<Area />, URL);
    await waitForDomChange();

    const dropDown = screen.getByRole('combobox');
    expect(dropDown).toBeInTheDocument();
    userEvent.selectOptions(dropDown, ['American']); // Canadian False

    expect(screen.getByRole('option', { name: 'American' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Canadian' }).selected).toBe(false);
  });
});
