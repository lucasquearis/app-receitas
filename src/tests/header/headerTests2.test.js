import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../../App';

const perfilBtnID = 'profile-top-btn';
const pageTitleID = 'page-title';
const searchBtnId = 'search-top-btn';

const searchBarInputID = 'search-input';
const ingredientesRadioID = 'ingredient-search-radio';
const nameRadioID = 'name-search-radio';
const firstLetterRadioID = 'first-letter-search-radio';
const searchBarBtnID = 'exec-search-btn';

describe('Testes do componente Header na pagina de Explorar Comidas Ingredientes', () => {
  const page = '/explorar/comidas/ingredientes';
  it('verifica se o header aparece em Explorar Comidas Area', () => {
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

describe('Testes do componente Header na pagina de Explorar Bebidas Ingredientes', () => {
  const page = '/explorar/bebidas/ingredientes';
  it('verifica se o header aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreDrinkIngredients = screen.getByTestId(perfilBtnID);
    const titleExploreDrinkIngredients = screen.getByTestId(pageTitleID);

    expect(perfilExploreDrinkIngredients).toBeDefined();
    expect(titleExploreDrinkIngredients).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar Ingredientes, é redirecionado',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(page);

      const perfilExploreDrinkIngredients = screen.getByTestId(perfilBtnID);
      userEvent.click(perfilExploreDrinkIngredients);
      const path = history.location.pathname;

      expect(path).toBe('/perfil');
    });

  it('verifa se o nome da pagina é "Explorar Ingredientes"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreDrinkIngredients = screen.getByTestId(pageTitleID);

    expect(titleExploreDrinkIngredients.innerHTML).toBe('Explorar Ingredientes');
  });
});

describe('Testes do componente Header na pagina de Explorar Comidas Area', () => {
  const page = '/explorar/comidas/area';
  it('verifica se o header aparece em Explorar Comidas Area', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreFoodArea = screen.getByTestId(perfilBtnID);
    const titleExploreFoodArea = screen.getByTestId(pageTitleID);

    expect(perfilExploreFoodArea).toBeDefined();
    expect(titleExploreFoodArea).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar Comidas Area, é redirecionado',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(page);

      const perfilExploreFoodArea = screen.getByTestId(perfilBtnID);
      userEvent.click(perfilExploreFoodArea);
      const path = history.location.pathname;

      expect(path).toBe('/perfil');
    });

  it('verifa se o nome da pagina é "Explorar Origem"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreFoodArea = screen.getByTestId(pageTitleID);

    expect(titleExploreFoodArea.innerHTML).toBe('Explorar Origem');
  });

  it('verifa se ao clicar no botão de pesquisa a barra de pesquisa aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const search = screen.getByTestId(searchBtnId);
    userEvent.click(search);

    const searchInput = screen.getByTestId(searchBarInputID);
    const ingredientesRadio = screen.getByTestId(ingredientesRadioID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioID);
    const searchBtn = screen.getByTestId(searchBarBtnID);

    expect(searchInput).toBeDefined();
    expect(ingredientesRadio).toBeDefined();
    expect(nameRadio).toBeDefined();
    expect(firstLetterRadio).toBeDefined();
    expect(searchBtn).toBeDefined();
  });
});

describe('Testes do componente Header na pagina de Perfil', () => {
  const page = '/perfil';
  it('verifica se o header aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilBtnPerfilPage = screen.getByTestId(perfilBtnID);
    const titlePerfilPage = screen.getByTestId(pageTitleID);

    expect(perfilBtnPerfilPage).toBeDefined();
    expect(titlePerfilPage).toBeDefined();
  });

  it('verifa se o nome da pagina é "Perfil"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreDrinkIngredients = screen.getByTestId(pageTitleID);

    expect(titleExploreDrinkIngredients.innerHTML).toBe('Perfil');
  });
});
