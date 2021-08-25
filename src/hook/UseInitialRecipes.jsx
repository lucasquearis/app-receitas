import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../redux/actions/fetchActions';

const UseInitialRecipes = (type) => {
  const dispatch = useDispatch();

  const fetchAPI = useCallback(async () => {
    if (type === 'meals') {
      let result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      result = await result.json();
      return dispatch(getRecipes(result));
    } if (type === 'drinks') {
      let result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      result = await result.json();
      return dispatch(getRecipes(result));
    }
  }, [dispatch, type]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);
};

export default UseInitialRecipes;
