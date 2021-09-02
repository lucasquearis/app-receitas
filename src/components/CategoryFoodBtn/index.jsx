import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFoodRedux, fetchFoodByCategory, fetchFoodsCategoriesRedux,
} from '../../redux/actions/foodActions';

function CategoryFoodBtn() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('');
  const buttonLimits = 5;
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodsCategoriesRedux);
  }, [dispatch]);

  const handleClick = (name) => {
    if (current === name || name === 'All') {
      setCurrent('');

      dispatch(fetchFoodRedux);
    } else {
      dispatch(fetchFoodByCategory(name));
      setCurrent(name);
    }
  };

  if (!categories) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <section className="recipe-category">
      <Button
        // color="secondary"
        variant="contained"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
        className="Button"
      >
        All
      </Button>
      {categories.meals && categories.meals.slice(0, buttonLimits).map(
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
    </section>
  );
}

export default CategoryFoodBtn;
