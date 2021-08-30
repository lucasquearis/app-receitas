import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestFoodsCategories,
  requestDrinksCategories,
  getRecipes,
  getCategories,
} from '../redux/actions/recipesActions';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';

export default function useRecipes(setRedirect) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);
  const [pageObjName, setPageObjName] = useState('meals');

  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    if (currentPage.includes('/comidas')) {
      setPageObjName('meals');
      dispatch(requestFoodsCategories());
    } else if (currentPage.includes('/bebidas')) {
      setPageObjName('drinks');
      dispatch(requestDrinksCategories());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (data === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      dispatch(getRecipes([]));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data && data.length === 1) {
      setRedirect(true);
    }
  }, [data, dispatch, setRedirect]);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(getRecipes(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (searched) {
      if (filterIngredient && !filterName && !filterFirstLetter) {
        getDataByIngredient(inputValue)
          .then((response) => setData(response[pageObjName]));
      } else if (filterName && !filterIngredient && !filterFirstLetter) {
        getDataByName(inputValue)
          .then((response) => setData(response[pageObjName]));
      } else if (filterFirstLetter && !filterIngredient && !filterName) {
        getDataByFirstLetter(inputValue)
          .then((response) => setData(response[pageObjName]));
      }
    }
  }, [
    filterIngredient,
    filterName,
    filterFirstLetter,
    currentPage,
    inputValue,
    searched,
    pageObjName,
  ]);

  useEffect(() => () => {
    setSearched(false);
  }, [searched]);

  useEffect(() => () => {
    dispatch(getRecipes([]));
    dispatch(getCategories([]));
  }, [dispatch]);

  return {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  };
}
