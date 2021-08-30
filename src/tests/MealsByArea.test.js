import React from 'react';
// import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
// import { mealsResponse } from './mocks/mealsMock';
// import { areasResponse, areaResponse } from './mocks/mealsByAreaMock';
import { areasResponse } from './mocks/mealsByAreaMock';
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

const justAreasMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(areasResponse),
    }));
};

/* const mealsByAreaMockFetch = () => {
  justAreasMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsResponse),
    }));
}; */

/* const areaMockFetch = () => {
  mealsByAreaMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(areaResponse),
    }));
}; */

describe('Testa a página de receitas feitas', () => {
  beforeEach(() => jest.clearAllMocks());

  justAreasMockFetch();
  it('Exibe as 27 opções de nacionalidades e uma opção All', async () => {
    await act(async () => {
      renderWithRouter(<MealsByArea />);
    });

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const options = await screen.findByTestId('explore-by-area-dropdown');
    expect(options).toHaveProperty('nodeName', 'SELECT');
    const optionsAreas = Array.from(options.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(optionsAreas).toEqual(expect.arrayContaining(AREAS_OPTIONS));
  });
});
