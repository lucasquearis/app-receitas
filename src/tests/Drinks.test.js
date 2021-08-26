import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Drinks from '../pages/Drinks';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

const drinks = 'drinks-bottom-btn';
const food = 'food-bottom-btn';
const profile = 'profile-top-btn';

describe('Testes no componente Drink', () => {
  it('verifica se esta na pagina de bebidas', () => {
    const { history } = renderWithReduxAndRouter(<App />);
    history.push('/bebidas');
    const email = screen.queryByTestId('email-input');
    expect(email).toBeNull();
  });
  it('verifica se tem os icones na tela', () => {
    renderWithReduxAndRouter(<Drinks />);
    expect(screen.getByTestId(drinks)).toBeInTheDocument();
    expect(screen.getByTestId(food)).toBeInTheDocument();
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });
  it('verifica se ao clicar em profile, vai para tela de perfil', () => {
    const { history } = renderWithReduxAndRouter(<Drinks />);
    const drinkLink = screen.getByTestId('perfil-link');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
  it('verifica se ao clicar em bebidas, abre pagina de bebidas', () => {
    const { history } = renderWithReduxAndRouter(<Drinks />);
    const drinkLink = screen.getByTestId('icone-bebida');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
  it('verifica se ao clicar em explorar, abre a pagina de explorar', () => {
    const { history } = renderWithReduxAndRouter(<Drinks />);
    const drinkLink = screen.getByTestId('icone-explorar');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('verifica se ao clicar em bebidas, abre a pagina de bebidas', () => {
    const { history } = renderWithReduxAndRouter(<Drinks />);
    const drinkLink = screen.getByTestId('icone-explorar');
    const DrinksLink = screen.getByTestId('icone-bebida');
    userEvent.click(drinkLink);
    userEvent.click(DrinksLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});
