import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCategoriesDrinksApi } from '../../services/fetchApi';
import { fetchRecipesForCategory, fetchSearchRecipes } from '../../redux/actions';

const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: false };

function FiltersRecipesDrinks({ getCategory, recipesNotFilter }) {
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggle, setIsToggle] = useState('');
  const [isFilteredCategory, setFilteredCategory] = useState(false);
  const [category, setCategory] = useState('All');

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesDrinksApi();
      const FiveNumber = 5;
      const firstFivesCategories = data.filter((_item, index) => index < FiveNumber);
      setCategories(firstFivesCategories);
      setIsMounted(true);
    };
    if (!isMounted) fetchCategories();
  };

  useEffect(getCategories);

  function handleClick({ target: { name } }) {
    if (!isFilteredCategory || isToggle !== name) {
      setCategory(name);
      getCategory(name);
      setFilteredCategory(true);
      return setIsToggle(name);
    }
    setCategory('All');
    recipesNotFilter();
    setFilteredCategory(false);
  }

  function setCategoryAll() {
    setCategory('All');
    recipesNotFilter();
    setFilteredCategory(false);
  }

  return (
    <div className="filter-recipes">
      {categories.map(({ strCategory }) => (
        <button
          className="filter-recipes-btn"
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          name={ strCategory }
          onClick={ handleClick }
          style={ { backgroundColor: category === strCategory ? '#350' : '#673' } }
        >
          {strCategory.replace(' / Float / Shake', '')}
        </button>
      ))}
      <button
        className="filter-recipes-btn"
        style={ { backgroundColor: category === 'All' ? '#350' : '#673' } }
        type="button"
        data-testid="All-category-filter"
        onClick={ setCategoryAll }
        name="All"
      >
        All
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(fetchRecipesForCategory(category)),
  recipesNotFilter: () => dispatch(fetchSearchRecipes(PARAMS_NOT_FILTER)),
});

FiltersRecipesDrinks.propTypes = {
  getCategory: func.isRequired,
  recipesNotFilter: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersRecipesDrinks);
