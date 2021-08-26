import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as mocks from './mock';
import Bebidas from '../pages/Bebidas';
import Provider from '../context/Provider';

const numberOfButton = 7;
const numberOfImage = 17;
const numberOfLink = 16;
const recipesNumber = 12;
let number0to11 = [];

for (let index = 0; recipesNumber > index; index += 1) {
  number0to11 = [...number0to11, index];
}

const {
  mockAllDrinks,
  mockDrinksCategory } = mocks;

describe('test se há todos os componente', () => {
  it('verifica se tem header', async () => {
    renderWithRouter(<Provider><Bebidas /></Provider>);
    await screen.findByTestId(/page-title/i);
  });

  it('test se há footer', async () => {
    renderWithRouter(<Provider><Bebidas /></Provider>);
    await screen.findByTestId(/footer/i);
  });

  it(`verifica se há 7 botões com as 6 primeiras 
      categorias da API e 1 de busca`, async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockDrinksCategory);
    renderWithRouter(<Provider><Bebidas /></Provider>);
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(numberOfButton);
  });

  it(`verifica se há 17 imagens, 
      12 cards, 3 links e pesquisa`, async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockDrinksCategory);
    global.fetch.mockResolvedValue(mockAllDrinks);
    renderWithRouter(<Provider><Bebidas /></Provider>);
    const image = await screen.findAllByRole('img');
    expect(image.length).toBe(numberOfImage);
  });

  it('verifica se há 16 links, 12 de comida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockDrinksCategory);
    global.fetch.mockResolvedValue(mockAllDrinks);
    renderWithRouter(<Provider><Bebidas /></Provider>);
    const links = await screen.findAllByRole('link');
    expect(links.length).toBe(numberOfLink);
  });

  it('verifica os textos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockDrinksCategory);
    global.fetch.mockResolvedValue(mockAllDrinks);
    renderWithRouter(<Provider><Bebidas /></Provider>);
    const textBebidas = await screen.findByText(/Bebidas/i);
    const textAll = await screen.findByText(/all/i);
    expect(textBebidas.tagName).toBe('H1');
    expect(textAll.tagName).toBe('BUTTON');
  });
});

describe('testar os ids', () => {
  it('cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockDrinksCategory);
    global.fetch.mockResolvedValue(mockAllDrinks);
    renderWithRouter(<Provider><Bebidas /></Provider>);
    await screen.findByTestId(`${number0to11[0]}-recipe-card`);
    await screen.findByTestId(`${number0to11[1]}-recipe-card`);
    await screen.findByTestId(`${number0to11[2]}-recipe-card`);
    await screen.findByTestId(`${number0to11[3]}-recipe-card`);
    await screen.findByTestId(`${number0to11[4]}-recipe-card`);
    await screen.findByTestId(`${number0to11[5]}-recipe-card`);
    await screen.findByTestId(`${number0to11[6]}-recipe-card`);
    await screen.findByTestId(`${number0to11[7]}-recipe-card`);
    await screen.findByTestId(`${number0to11[8]}-recipe-card`);
    await screen.findByTestId(`${number0to11[9]}-recipe-card`);
    await screen.findByTestId(`${number0to11[10]}-recipe-card`);
    await screen.findByTestId(`${number0to11[11]}-recipe-card`);

    await screen.findByTestId(`${number0to11[0]}-card-img`);
    await screen.findByTestId(`${number0to11[1]}-card-img`);
    await screen.findByTestId(`${number0to11[2]}-card-img`);
    await screen.findByTestId(`${number0to11[3]}-card-img`);
    await screen.findByTestId(`${number0to11[4]}-card-img`);
    await screen.findByTestId(`${number0to11[5]}-card-img`);
    await screen.findByTestId(`${number0to11[6]}-card-img`);
    await screen.findByTestId(`${number0to11[7]}-card-img`);
    await screen.findByTestId(`${number0to11[8]}-card-img`);
    await screen.findByTestId(`${number0to11[9]}-card-img`);
    await screen.findByTestId(`${number0to11[10]}-card-img`);
    await screen.findByTestId(`${number0to11[11]}-card-img`);

    await screen.findByTestId(`${number0to11[0]}-card-name`);
    await screen.findByTestId(`${number0to11[1]}-card-name`);
    await screen.findByTestId(`${number0to11[2]}-card-name`);
    await screen.findByTestId(`${number0to11[3]}-card-name`);
    await screen.findByTestId(`${number0to11[4]}-card-name`);
    await screen.findByTestId(`${number0to11[5]}-card-name`);
    await screen.findByTestId(`${number0to11[6]}-card-name`);
    await screen.findByTestId(`${number0to11[7]}-card-name`);
    await screen.findByTestId(`${number0to11[8]}-card-name`);
    await screen.findByTestId(`${number0to11[9]}-card-name`);
    await screen.findByTestId(`${number0to11[10]}-card-name`);
    await screen.findByTestId(`${number0to11[11]}-card-name`);
  });
});
