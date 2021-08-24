import { fetchFoods, fetchDrinks, drinkCategories, foodCategories } from '../../services';
import {
  ADD_FOODS,
  ADD_DRINKS,
  ADD_DRINKS_CATEGORIES,
  ADD_FOODS_CATEGORIES } from './actionTypes';

export const addFoods = (payload) => ({
  type: ADD_FOODS,
  payload,
});

const addDrinks = (payload) => ({
  type: ADD_DRINKS,
  payload,
});

const addDrinksCategories = (payload) => ({
  type: ADD_DRINKS_CATEGORIES,
  payload,
});

const addFoodsCategories = (payload) => ({
  type: ADD_FOODS_CATEGORIES,
  payload,
});

export const fetchFoodRedux = async (dispatch) => {
  const results = await fetchFoods();
  dispatch(addFoods(results));
};

export const fetchDrinksRedux = async (dispatch) => {
  const results = await fetchDrinks();
  dispatch(addDrinks(results));
};

export const fetchFoodsCategoriesRedux = async (dispatch) => {
  const results = await foodCategories();
  dispatch(addFoodsCategories(results));
};

export const fetchDrinksCategoriesRedux = async (dispatch) => {
  const results = await drinkCategories();
  dispatch(addDrinksCategories(results));
};
