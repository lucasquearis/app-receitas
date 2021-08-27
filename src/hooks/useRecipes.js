import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestFoods,
  requestFoodsCategories,
  requestDrinks,
  requestDrinksCategories,
  getRecipes,
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
    if (currentPage === '/comidas') {
      setPageObjName('meals');
      dispatch(requestFoods());
      dispatch(requestFoodsCategories());
    } else if (currentPage === '/bebidas') {
      setPageObjName('drinks');
      dispatch(requestDrinks());
      dispatch(requestDrinksCategories());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (data === null) {
      dispatch(getRecipes([]));
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      dispatch(getRecipes(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data && data.length === 1) {
      setRedirect(true);
    }
  }, [data, dispatch, setRedirect]);

  useEffect(() => {
    if (searched) {
      console.log(pageObjName);
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

  return {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  };
}
