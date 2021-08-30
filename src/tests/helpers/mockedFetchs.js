import {
  mealsCategoriesResponse,
  mealsResponse,
  mealsCategoryResponse,
} from '../mocks/mealsMock';
import {
  drinksCategoriesResponse,
  drinksResponse,
  drinksCategoryResponse,
} from '../mocks/drinksMock';
import { areasResponse, areaResponse } from '../mocks/mealsByAreaMock';

export const justMealMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsResponse),
    }));
};

export const mealsMockFetch = () => {
  justMealMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsCategoriesResponse),
    }));
};

export const changeMealsCategoryMockFetch = () => {
  mealsMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsCategoryResponse),
    }));
};

export const changeMealsTwiceMockFetch = () => {
  changeMealsCategoryMockFetch();
  justMealMockFetch();
};

export const justMealTwiceMockFetch = () => {
  mealsMockFetch();
  justMealMockFetch();
};

export const justDrinkMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinksResponse),
    }));
};

export const drinksMockFetch = () => {
  justDrinkMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinksCategoriesResponse),
    }));
};

export const changeDrinksCategoryMockFetch = () => {
  drinksMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinksCategoryResponse),
    }));
};

export const changeDrinksTwiceMockFetch = () => {
  changeDrinksCategoryMockFetch();
  justDrinkMockFetch();
};

export const justDrinkTwiceMockFetch = () => {
  drinksMockFetch();
  justDrinkMockFetch();
};

export const justAreasMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(areasResponse),
    }));
};

export const mealsByAreaMockFetch = () => {
  justAreasMockFetch();
  justMealMockFetch();
  justMealMockFetch();
};

export const areaMockFetch = () => {
  mealsByAreaMockFetch();
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(areaResponse),
    }));
};
