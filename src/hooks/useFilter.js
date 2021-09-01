import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import { fetchMealsCategory } from '../Services/fetchMeals';
import { fetchCocktailsCategory } from '../Services/fetchCocktails';

function useFilter() {
  const { globalState } = useContext(AppContext);
  const { meals, drinks } = globalState;
  const { pathname } = useLocation();
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const filters = async () => {
      const numCards = 12;
      let itemsFiltered = [];

      if (pathname === '/comidas') {
        itemsFiltered = [...meals].slice(0, numCards);
        if (filter !== 'All') {
          itemsFiltered = await fetchMealsCategory(filter);
          itemsFiltered = itemsFiltered.slice(0, numCards);
        }
      } else {
        itemsFiltered = [...drinks].slice(0, numCards);
        if (filter !== 'All') {
          itemsFiltered = await fetchCocktailsCategory(filter);
          itemsFiltered = itemsFiltered.slice(0, numCards);
        }
      }
      setCategory(itemsFiltered);
    };
    filters();
  }, [filter, meals, drinks, pathname]);

  return {
    filter,
    setFilter,
    category,
    setCategory,
  };
}

export default useFilter;
