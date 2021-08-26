import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestFoods,
  requestDrinks,
  getRecipes,
} from '../redux/actions/recipesActions';
import { getDataByCategory } from '../services/api';

export default function useCategories(setRedirect) {
  const [data, setData] = useState([]);
  const [pageObjName, setPageObjName] = useState('meals');
  const [filterCategory, setFilterCategory] = useState('All');
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    if (currentPage === '/comidas') {
      setPageObjName('meals');
    } else if (currentPage === '/bebidas') {
      setPageObjName('drinks');
    }
  }, [currentPage]);

  useEffect(() => {
    if (filterCategory === 'All') {
      if (pageObjName === 'meals') {
        dispatch(requestFoods());
      } else if (pageObjName === 'drinks') {
        dispatch(requestDrinks());
      }
    } else {
      setRedirect(false);
      getDataByCategory(filterCategory)
        .then((response) => setData(response[pageObjName]));
    }
  }, [filterCategory, dispatch, pageObjName, setRedirect]);

  useEffect(() => {
    dispatch(getRecipes(data));
  }, [data, dispatch]);

  return {
    setFilterCategory,
    filterCategory,
  };
}
