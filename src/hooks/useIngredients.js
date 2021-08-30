import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestFoodsIngredients,
  requestDrinksIngredients,
  getRecipes,
  getIngredients,
} from '../redux/actions/recipesActions';
import { getDataByIngredient } from '../services/api';

export default function useIngredients() {
  const [data, setData] = useState([]);
  const [pageObjName, setPageObjName] = useState('meals');
  const [ingredient, setIngredient] = useState(undefined);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;
  const history = useHistory();

  useEffect(() => {
    if (currentPage.includes('/comidas')) {
      dispatch(requestFoodsIngredients());
      setPageObjName('meals');
    } else if (currentPage.includes('/bebidas')) {
      dispatch(requestDrinksIngredients());
      setPageObjName('drinks');
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (ingredient) {
      getDataByIngredient(ingredient)
        .then((response) => setData(response[pageObjName]));
    }
  }, [ingredient, pageObjName]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(getRecipes(data));

      const changePage = () => {
        if (pageObjName === 'meals') {
          history.push('/comidas');
        } else {
          history.push('/bebidas');
        }
      };

      changePage();
    }
  }, [data, dispatch, history, pageObjName]);

  useEffect(() => () => {
    dispatch(getIngredients([]));
  }, [dispatch]);

  return {
    pageObjName,
    setIngredient,
  };
}
