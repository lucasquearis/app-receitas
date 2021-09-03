import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { drinkListByCategoryFetch, drinkListFetch } from '../redux/actions/actionDrink';
import './DrinkCategories.css';

export default function DrinkCategories() {
  const [clickedCategory, setClickedCategory] = useState('');

  const drinkCategoriesList = useSelector(({ drinkReducer }) => (
    drinkReducer.drinkCategoriesList));
  const dispatch = useDispatch();

  const withoutFilter = () => {
    setClickedCategory('All');
    dispatch(drinkListFetch());
  };

  const filterByCategory = (category) => {
    if (clickedCategory === category) {
      withoutFilter();
    } else {
      setClickedCategory(category);
      dispatch(drinkListByCategoryFetch(category));
    }
  };

  return (
    <div className="drink-category">
      <Button
        data-testid="All-category-filter"
        className="drink-category-button"
        onClick={ withoutFilter }
      >
        All
      </Button>
      {drinkCategoriesList.map((category) => (
        <Button
          data-testid={ `${category.strCategory}-category-filter` }
          className="drink-category-button"
          key={ category.strCategory }
          onClick={ () => filterByCategory(category.strCategory) }
        >
          {category.strCategory}
        </Button>
      ))}
    </div>
  );
}
