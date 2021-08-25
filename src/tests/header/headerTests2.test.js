import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../../App';

const perfilBtnID = 'profile-top-btn';
const pageTitleID = 'page-title';

describe('Testes do componente Header na pagina de Explorar Comidas Ingredientes', () => {
  const page = '/explorar/comidas/ingredientes';
  it('verifica se o header aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreFoodIngredients = screen.getByTestId(perfilBtnID);
    const titleExploreFoodIngredients = screen.getByTestId(pageTitleID);

    expect(perfilExploreFoodIngredients).toBeDefined();
    expect(titleExploreFoodIngredients).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar Ingredientes, é redirecionado',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(page);

      const perfilExploreFoodIngredients = screen.getByTestId(perfilBtnID);
      userEvent.click(perfilExploreFoodIngredients);
      const path = history.location.pathname;

      expect(path).toBe('/perfil');
    });

  it('verifa se o nome da pagina é "Explorar Ingredientes"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreFoodIngredients = screen.getByTestId(pageTitleID);

    expect(titleExploreFoodIngredients.innerHTML).toBe('Explorar Ingredientes');
  });
});
