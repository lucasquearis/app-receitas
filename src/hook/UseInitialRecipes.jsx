import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, getCategories } from '../redux/actions/fetchActions';

const RECIPES_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RECIPES_DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const CATEGORY_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const CATEGORY_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const UseInitialRecipes = (type) => {
  const dispatch = useDispatch();

  const fetchAPI = useCallback(async () => {
    if (type === 'meals') {
      let result = await fetch(RECIPES_MEALS_URL);
      result = await result.json();
      return dispatch(getRecipes(result));
    } if (type === 'drinks') {
      let result = await fetch(RECIPES_DRINKS_URL);
      result = await result.json();
      return dispatch(getRecipes(result));
    }
  }, [dispatch, type]);

  const fetchCategories = useCallback(async () => {
    if (type === 'meals') {
      let result = await fetch(CATEGORY_MEAL_URL);
      result = await result.json();
      return dispatch(getCategories(result));
    } if (type === 'drinks') {
      let result = await fetch(CATEGORY_DRINK_URL);
      result = await result.json();
      return dispatch(getCategories(result));
    }
  }, [dispatch, type]);

  useEffect(() => {
    fetchCategories();
    fetchAPI();
  }, [fetchAPI, fetchCategories]);
};

export default UseInitialRecipes;
