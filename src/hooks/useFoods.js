import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestFoods, getRecipes } from '../redux/actions/recipesActions';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';

export default function useDrinks() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);

  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    dispatch(requestFoods());
  }, [dispatch]);

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
    if (searched) {
      if (filterIngredient && !filterName && !filterFirstLetter) {
        getDataByIngredient(inputValue)
          .then((response) => setData(response.meals));
      } else if (filterName && !filterIngredient && !filterFirstLetter) {
        getDataByName(inputValue)
          .then((response) => setData(response.meals));
      } else if (filterFirstLetter && !filterIngredient && !filterName) {
        getDataByFirstLetter(inputValue)
          .then((response) => setData(response.meals));
      }
    }
  }, [
    filterIngredient,
    filterName,
    filterFirstLetter,
    currentPage,
    inputValue,
    searched]);

  return {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  };
}
