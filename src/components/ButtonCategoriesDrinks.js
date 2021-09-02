import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from '../context/DrinksContext';
import { fetchDrinksByCategoryName, fetchDrinksApi } from '../services/fetchDrinksApi';
import './buttonsDrinks.css';

const ButtonCategoriesDrinks = ({ categories }) => {
  const { setDrinks, setDrinksByCategories } = useContext(DrinksContext);
  const CATEGORIES = 5;
  const buttons = document.getElementsByName('category-buttons');
  const checked = false;

  const clearFilter = () => {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].checked = false;
    }
  };

  const filterByCategoryName = (event, categoryName) => {
    if (event.target.checked) {
      fetchDrinksByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
      setDrinksByCategories(true);
      clearFilter();
      event.target.checked = true;
    } else if (event.target.checked === false) {
      fetchDrinksApi().then((data) => setDrinks(data.drinks));
      clearFilter();
    } else if (event.target.checked === !checked) {
      fetchDrinksApi().then((data) => setDrinks(data.drinks));
      clearFilter();
      event.target.checked = !checked;
    }
  };

  const filterAll = (event) => {
    fetchDrinksApi().then((data) => setDrinks(data.drinks));
    clearFilter();
    event.target.checked = !checked;
  };

  return (
    <div className="buttons-drinks-container">
      {categories.map((category, index) => (
        index < CATEGORIES ? (
          <div className="check-drinks-filter">
            <label htmlFor="category-buttons" key={ index }>
              <input
                name="category-buttons"
                value={ category.strCategory }
                key={ index }
                type="checkbox"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ (event) => {
                  filterByCategoryName(event, category.strCategory);
                } }
              />
              <span>{category.strCategory}</span>
            </label>
          </div>
        ) : null
      ))}
      <label className="all-categories" htmlFor="category-buttons">
        <input
          type="checkbox"
          name="category-buttons"
          data-testid="All-category-filter"
          onClick={ (event) => { filterAll(event); } }
        />
        All
      </label>
    </div>
  );
};

ButtonCategoriesDrinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonCategoriesDrinks;
