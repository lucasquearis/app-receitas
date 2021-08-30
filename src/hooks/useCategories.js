import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestFoods,
  requestDrinks,
  getRecipes,
} from '../redux/actions/recipesActions';
import { getDataByCategory } from '../services/api';

export default function useCategories(setRedirect) {
  const [data, setData] = useState([]);
  const [pageObjName, setPageObjName] = useState('meals');
  const [filterCategory, setFilterCategory] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    if (currentPage === '/comidas') {
      setPageObjName('meals');
    } else if (currentPage === '/bebidas') {
      setPageObjName('drinks');
    }
  }, [currentPage]);

  useEffect(() => {
    if (recipes.length === 0) {
      setFilterCategory('All');
    }
  }, [recipes]);

  useEffect(() => {
    if (filterCategory === 'All') {
      if (pageObjName === 'meals') {
        dispatch(requestFoods());
      } else if (pageObjName === 'drinks') {
        dispatch(requestDrinks());
      }
    } else if (filterCategory) {
      setRedirect(false);
      getDataByCategory(filterCategory)
        .then((response) => setData(response[pageObjName]));
    }
  }, [filterCategory, dispatch, pageObjName, setRedirect]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(getRecipes(data));
    }
  }, [data, dispatch]);

  useEffect(() => () => {
    setFilterCategory(false);
  }, [dispatch]);

  return {
    setFilterCategory,
    filterCategory,
  };
}
