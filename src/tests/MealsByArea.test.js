import React from 'react';
import { act, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import {
  mealsByAreaMockFetch,
  justAreasMockFetch,
  areaMockFetch,
} from './helpers/mockedFetchs';
import MealsByArea from '../pages/MealsByArea';

const AREAS_OPTIONS = [
  'All',
  'American',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Dutch',
  'Egyptian',
  'French',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Turkish',
  'Unknown',
  'Vietnamese',
];

const firstCallMealsName = [
  'Corba',
  'Burek',
  'Kumpir',
  'Tamiya',
  'Dal fry',
  'Poutine',
  'Lasagne',
  'Timbits',
  'Wontons',
  'Kafteji',
  'Big Mac',
  'Koshari',
];

const portugueseMealsName = [
  'Fish fofos',
  'Grilled Portuguese sardines',
  'Piri-piri chicken and slaw',
  'Portuguese barbecued pork (Febras assadas)',
  'Portuguese custard tarts',
  'Portuguese fish stew (Caldeirada de peixe)',
  'Portuguese prego with green piri-piri',
  'Spring onion and prawn empanadas',
];

describe('Testa a página de explorar receitas por origem', () => {
  beforeEach(() => jest.clearAllMocks());

  mealsByAreaMockFetch();
  it('São feitas três requisições/chamadas para a API', async () => {
    await act(async () => {
      renderWithRouter(<MealsByArea />);
    });
    const NUMBER_OF_CALLS = 3;
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(NUMBER_OF_CALLS);
  });

  justAreasMockFetch();
  it('Exibe as 27 opções de nacionalidades e uma opção All', async () => {
    await act(async () => {
      renderWithRouter(<MealsByArea />);
    });

    const options = await screen.findByTestId('explore-by-area-dropdown');
    expect(options).toHaveProperty('nodeName', 'SELECT');
    const optionsAreas = Array.from(options.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(optionsAreas).toEqual(expect.arrayContaining(AREAS_OPTIONS));
  });

  mealsByAreaMockFetch();
  it('Exibe as 12 primeiras receitas de comidas retornadas pela API', async () => {
    await act(async () => {
      renderWithRouter(<MealsByArea />);
    });

    firstCallMealsName.forEach((mealName, index) => {
      const mealElement = screen.getByTestId(`${index}-card-name`);
      expect(mealElement).toHaveTextContent(mealName);
    });
  });

  areaMockFetch();
  it('Exibe receitas referente a uma determinada nacionalidade ao'
      + ' selecionar a opção referente a ela', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      renderWithRouter(<MealsByArea />);
    });

    fireEvent.change(await screen
      .findByTestId('explore-by-area-dropdown'), { target: { value: 'Portuguese' } });

    await act(() => promise);

    portugueseMealsName.forEach((mealName, index) => {
      const mealElement = screen.getByTestId(`${index}-card-name`);
      expect(mealElement).toHaveTextContent(mealName);
    });
  });
});
