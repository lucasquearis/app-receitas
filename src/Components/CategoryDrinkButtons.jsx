import React, { useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoriesDrink,
  getAllDrinksThunk,
  getDrinksThunk,
  selectDrinks } from '../Redux/actions/categoriesDrinksAction';

function CategoryDrinkButtons() {
  const { drinksReducer: {
    drinksCategories,
    isLoading,
    selectedCategory } } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(selectedCategory);

  useEffect(() => {
    dispatch(getCategoriesDrink());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== 'All' && selectedCategory !== 'none') {
      dispatch(getDrinksThunk(selectedCategory));
    } else {
      dispatch(getAllDrinksThunk());
    }
  }, [dispatch, selectedCategory]);

  if (!isLoading) {
    return (
      <session className="btn-session">
        { drinksCategories.map((category) => (
          <button
            type="button"
            key={ category.key }
            onClick={ () => { dispatch(selectDrinks(category.strCategory)); } }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
        <button
          type="button"
          key="6"
          onClick={ () => { dispatch(selectDrinks('All')); } }
          name="All"
          data-testid="All-category-filter"
        >
          All
        </button>
      </session>
    );
  }
  return <ReactBootstrap.Spinner animation="border" variant="danger" />;
}

export default CategoryDrinkButtons;
