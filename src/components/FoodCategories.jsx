import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { foodListByCategoryFetch, foodListFetch } from '../redux/actions/actionFood';
import './FoodCategories.css';

export default function FoodCategories() {
  const [clickedCategory, setClickedCategory] = useState('');

  const foodCategoriesList = useSelector(({ foodReducer }) => (
    foodReducer.foodCategoriesList));
  const dispatch = useDispatch();

  const withoutFilter = () => {
    setClickedCategory('All');
    dispatch(foodListFetch());
  };

  const filterByCategory = (category) => {
    if (clickedCategory === category) {
      withoutFilter();
    } else {
      setClickedCategory(category);
      dispatch(foodListByCategoryFetch(category));
    }
  };
  return (
    <div className="food-category">
      <Button
        data-testid="All-category-filter"
        className="category-button"
        onClick={ withoutFilter }
      >
        All
      </Button>
      {foodCategoriesList.map((category) => (
        <Button
          data-testid={ `${category.strCategory}-category-filter` }
          className="category-button"
          key={ category.strCategory }
          onClick={ () => filterByCategory(category.strCategory) }
        >
          {category.strCategory}
        </Button>
      ))}
    </div>
  );
}
