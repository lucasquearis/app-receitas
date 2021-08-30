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

  function handleClick({ target: { value } }) {
    if (!isFilteredCategory || isToggle !== value) {
      getCategory(value);
      setFilteredCategory(true);
      return setIsToggle(value);
    }
    recipesNotFilter();
    setFilteredCategory(false);
  }

  function setCategoryAll() {
    recipesNotFilter();
    setFilteredCategory(false);
  }

  return (
    <>
      {categories.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ setCategoryAll }
      >
        All
      </button>
    </>
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
