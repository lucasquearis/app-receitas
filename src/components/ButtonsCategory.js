import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../context/FoodContext';
import { fetchMealsByCategoryName, fetchMealApi } from '../services/fetchMealApi';
import './buttonsCategory.css';

const ButtonCategories = ({ categories }) => {
  const { setFoods, setMealsByCategories } = useContext(FoodContext);
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
      fetchMealsByCategoryName(categoryName).then((data) => setFoods(data.meals));
      setMealsByCategories(true);
      clearFilter();
      event.target.checked = true;
    } else if (event.target.checked === false) {
      fetchMealApi().then((data) => setFoods(data.meals));
      clearFilter();
    } else if (event.target.checked === !checked) {
      fetchMealApi().then((data) => setFoods(data.meals));
      clearFilter();
      event.target.checked = !checked;
    }
  };

  const filterAll = (event) => {
    fetchMealApi().then((data) => setFoods(data.meals));
    clearFilter();
    event.target.checked = !checked;
  };

  return (
    <div className="buttons-container">
      {categories.map((category, index) => (
        index < CATEGORIES ? (
          <div className="check-filter">
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

ButtonCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonCategories;
