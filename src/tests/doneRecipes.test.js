import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import localStorageMock from './mocks/mockLocalStorage';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const image0TestiD = '0-horizontal-image';
const image1TestiD = '1-horizontal-image';
const foodBtnTestid = 'filter-by-food-btn';
const name1Testid = '1-horizontal-name';
const path = '/receitas-feitas';

describe('Testa tela de receitas feitas', () => {
  beforeEach(() => {
    // Lógica de spyOn do localStorage tirada de https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(localStorageMock);
    renderWithReduxAndRouter(<App />, {}, {
      route: path,
    });
  });

  describe('Testa os ids', () => {
    it('Os ids estão disponíveis', () => {
      expect(localStorage.getItem).toHaveBeenCalledWith('doneRecipes');
      const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
      const filterByFoodBtn = screen.getByTestId(foodBtnTestid);
      const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
      const image0 = screen.getByTestId(image0TestiD);
      const topText0 = screen.getByTestId('0-horizontal-top-text');
      const name0 = screen.getByTestId('0-horizontal-name');
      const doneDate0 = screen.getByTestId('0-horizontal-done-date');
      const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
      const pastaTag = screen.getByTestId('0-Pasta-horizontal-tag');
      const curryTag = screen.getByTestId('0-Curry-horizontal-tag');
      const image1 = screen.getByTestId(image1TestiD);
      const topText1 = screen.getByTestId('1-horizontal-top-text');
      const name1 = screen.getByTestId(name1Testid);
      const doneDate1 = screen.getByTestId('1-horizontal-done-date');
      const shareBtn1 = screen.getByTestId('1-horizontal-share-btn');
      expect(filterByAllBtn).toBeInTheDocument();
      expect(filterByFoodBtn).toBeInTheDocument();
      expect(filterByDrinkBtn).toBeInTheDocument();
      expect(image0).toBeInTheDocument();
      expect(topText0).toBeInTheDocument();
      expect(name0).toBeInTheDocument();
      expect(doneDate0).toBeInTheDocument();
      expect(shareBtn0).toBeInTheDocument();
      expect(pastaTag).toBeInTheDocument();
      expect(curryTag).toBeInTheDocument();
      expect(image1).toBeInTheDocument();
      expect(topText1).toBeInTheDocument();
      expect(name1).toBeInTheDocument();
      expect(doneDate1).toBeInTheDocument();
      expect(shareBtn1).toBeInTheDocument();
    });
  });

  describe('Testa atributos dos cards', () => {
    it('O card de comida está com os atributos corretos', () => {
      const image0 = screen.getByTestId(image0TestiD);
      const topText0 = screen.getByTestId('0-horizontal-top-text');
      const name0 = screen.getByTestId('0-horizontal-name');
      const doneDate0 = screen.getByTestId('0-horizontal-done-date');
      const pastaTag = screen.getByTestId('0-Pasta-horizontal-tag');
      const curryTag = screen.getByTestId('0-Curry-horizontal-tag');
      expect(image0).toHaveAttribute('src');
      expect(image0.src).toContain('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
      expect(topText0.innerHTML).toContain('Italian - Vegetarian');
      expect(name0.innerHTML).toContain('Spicy Arrabiata Penne');
      expect(doneDate0.innerHTML).toContain('23/06/2020');
      expect(pastaTag.innerHTML).toContain('Pasta');
      expect(curryTag.innerHTML).toContain('Curry');
    });

    it('O card de bebida está com os atributos corretos', () => {
      const image1 = screen.getByTestId(image1TestiD);
      const topText1 = screen.getByTestId('1-horizontal-top-text');
      const name1 = screen.getByTestId(name1Testid);
      const doneDate1 = screen.getByTestId('1-horizontal-done-date');
      expect(image1).toHaveAttribute('src');
      expect(image1.src).toContain('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
      expect(topText1.innerHTML).toContain('Alcoholic');
      expect(name1.innerHTML).toContain('Aquamarine');
      expect(doneDate1.innerHTML).toContain('23/06/2020');
    });
  });

  describe('Testa botão de compartilhar', () => {
    it('O link é copiado e a mensagem aparece na tela', () => {
      copy.mockImplementation(() => null);
      const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
      fireEvent.click(shareBtn0);
      const message = screen.getByText('Link copiado!');
      expect(message).toBeInTheDocument();
      expect(copy).toHaveBeenCalledWith('http://localhost:3000/comidas/52771');
    });
  });

  describe('Testa botões dos filtros', () => {
    it('Testa botão Foods', () => {
      const filterByFoodBtn = screen.getByTestId(foodBtnTestid);
      const image0 = screen.getByTestId(image0TestiD);
      const image1 = screen.getByTestId(image1TestiD);
      expect(image0).toBeInTheDocument();
      expect(image1).toBeInTheDocument();
      fireEvent.click(filterByFoodBtn);
      expect(image0).toBeInTheDocument();
      expect(image1).not.toBeInTheDocument();
      expect(image0.src).toContain('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    });

    it('Testa botão Drinks', () => {
      const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
      const image0 = screen.getByTestId(image0TestiD);
      const image1 = screen.getByTestId(image1TestiD);
      expect(image0).toBeInTheDocument();
      expect(image1).toBeInTheDocument();
      fireEvent.click(filterByDrinkBtn);
      expect(image0).toBeInTheDocument();
      expect(image1).not.toBeInTheDocument();
      expect(image0.src).toContain('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    });

    it('Testa botão All', () => {
      const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
      const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
      fireEvent.click(filterByFoodBtn);
      fireEvent.click(filterByAllBtn);
      const image0 = screen.getByTestId(image0TestiD);
      const image1 = screen.getByTestId(image1TestiD);
      expect(image0).toBeInTheDocument();
      expect(image1).toBeInTheDocument();
    });
  });
});

describe('Testa mudança de rotas', () => {
  beforeEach(() => {
    // Lógica de spyOn do localStorage tirada de https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(localStorageMock);
  });

  it('Vai para a tela de detalhes ao clicar na imagem da receita', () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, {
      route: path,
    });
    const image0 = screen.getByTestId(image0TestiD);
    fireEvent.click(image0);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Vai para a tela de detalhes ao clicar no nome da receita', () => {
    const { history } = renderWithReduxAndRouter(<App />, {}, {
      route: path,
    });
    const name1 = screen.getByTestId(name1Testid);
    fireEvent.click(name1);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas/178319');
  });
});
