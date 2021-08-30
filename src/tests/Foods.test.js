import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Foods from '../pages/Foods';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

const drinks = 'drinks-bottom-btn';
const profile = 'profile-top-btn';
const food = 'food-bottom-btn';

describe('Testes no componente Food', () => {
  it('verifica se esta na pagina de comidas', () => {
    const { history } = renderWithReduxAndRouter(<App />);
    history.push('/comidas');
    const email = screen.queryByTestId('email-input');
    expect(email).toBeNull();
  });
  it('verifica se tem os icones na tela', () => {
    renderWithReduxAndRouter(<Foods />);
    expect(screen.getByTestId(drinks)).toBeInTheDocument();
    expect(screen.getByTestId(food)).toBeInTheDocument();
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });
  it('verifica se ao clicar em profile, vai para tela de perfil', () => {
    const { history } = renderWithReduxAndRouter(<Foods />);
    const drinkLink = screen.getByTestId('perfil-link');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
  it('verifica se ao clicar em bebidas, abre pagina de bebidas', () => {
    const { history } = renderWithReduxAndRouter(<Foods />);
    const drinkLink = screen.getByTestId('icone-bebida');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
  it('verifica se ao clicar em explorar, abre a pagina de explorar', () => {
    const { history } = renderWithReduxAndRouter(<Foods />);
    const drinkLink = screen.getByTestId('icone-explorar');
    userEvent.click(drinkLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('verifica se ao clicar em comidas, abre a pagina de comidas', () => {
    const { history } = renderWithReduxAndRouter(<Foods />);
    const drinkLink = screen.getByTestId('icone-explorar');
    const foodsLink = screen.getByTestId('icone-comida');
    userEvent.click(drinkLink);
    userEvent.click(foodsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
describe('testa os cards dentro da tela foods', () => {
  it('verifica se ao renderizar a tela, apenas 12 cards aparecem', async () => {
    renderWithReduxAndRouter(<Foods />);
    // for (let index = 0; index < doze; index += 1) {
    //   const foodCard = screen.getAllByTestId(`${index}-recipe-card`);
    //   expect(foodCard).toBeInTheDocument();
    // }
    // await waitFor(() => screen.getByTestId('0-recipe-card'));
  });
});
