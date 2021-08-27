import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCategoriesDrinksApi, fetchSearchDrinksApi } from '../../services/fetchApi';
import { fetchRecipesForCategory } from '../../redux/actions';
import getRecipes from '../../redux/actions/getRecipes';

function FiltersRecipesDrinks({ getCategory, getRecipesNotFilter }) {
  const [categories, setCategories] = useState([]);
  const [isMouted, setisMouted] = useState(false);
  const [isToggle, setisToggle] = useState('');
  const [isFilteredCategory, setFilteredCategory] = useState(false);

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesDrinksApi();
      const FiveNumber = 5;
      const firstFivesCategories = data.filter((_item, index) => index < FiveNumber);
      setCategories(firstFivesCategories);
      setisMouted(true);
    };
    if (!isMouted) fetchCategories();
  };

  useEffect(getCategories);

  async function handleClick({ target: { value } }) {
    if (!isFilteredCategory || isToggle !== value) {
      getCategory(value);
      setFilteredCategory(true);
      return setisToggle(value);
    }
    const recipes = await fetchSearchDrinksApi('name', '');
    getRecipesNotFilter(recipes);
    setFilteredCategory(false);
  }

  async function setCategoryAll() {
    const recipes = await fetchSearchDrinksApi('name', '');
    getRecipesNotFilter(recipes);
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
  getRecipesNotFilter: (recipes) => dispatch(getRecipes(recipes)),
});

FiltersRecipesDrinks.propTypes = {
  getCategory: func.isRequired,
  getRecipesNotFilter: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersRecipesDrinks);
