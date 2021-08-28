import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDrinksRedux, fetchDrinksByCategory, fetchDrinksCategoriesRedux,
} from '../redux/actions/foodActions';

function CategoryDrinkBtn() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('');
  const buttonLimits = 5;
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksCategoriesRedux);
  }, [dispatch]);

  const handleClick = (name) => {
    if (current === name || name === 'All') {
      setCurrent('');

      dispatch(fetchDrinksRedux);
    } else {
      dispatch(fetchDrinksByCategory(name));
      setCurrent(name);
    }
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
      >
        All
      </Button>
      {categories.drinks && categories.drinks.slice(0, buttonLimits).map(
        (category, id) => (
          <Button
            color="secondary"
            variant="contained"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ id }
            onClick={ () => handleClick(category.strCategory) }
          >
            { category.strCategory }
          </Button>),
      )}
    </div>
  );
}

export default CategoryDrinkBtn;
