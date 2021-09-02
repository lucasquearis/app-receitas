import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCategoriesFoodsApi } from '../../services/fetchApi';
import { fetchRecipesForCategory, fetchSearchRecipes } from '../../redux/actions';
import './filtersRecipesFoods.css';

const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: true };

function FiltersRecipesFoods({ getCategory, recipesNotFilter }) {
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggle, setIsToggle] = useState('');
  const [category, setCategory] = useState('All');
  const [isFilteredCategory, setFilteredCategory] = useState(false);

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesFoodsApi();
      const FiveNumber = 5;
      const firstFivesCategories = data.filter((_item, index) => index < FiveNumber);
      setCategories(firstFivesCategories);
      setIsMounted(true);
    };
    if (!isMounted) fetchCategories();
  };

  useEffect(getCategories);

  function handleClick({ name }) {
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
    <div className="filter-food">
      {categories.map(({ strCategory }) => (
        <button
          className="filter-food-btn"
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          name={ strCategory }
          onClick={ ({ target }) => handleClick(target) }
          style={ { backgroundColor: category === strCategory ? '#350' : '#673' } }
        >
          {strCategory}
        </button>
      ))}
      <button
        className="filter-food-btn"
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
  getCategory: (category) => dispatch(fetchRecipesForCategory(category, true)),
  recipesNotFilter: () => dispatch(fetchSearchRecipes(PARAMS_NOT_FILTER)),
});

FiltersRecipesFoods.propTypes = {
  getCategory: func.isRequired,
  recipesNotFilter: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersRecipesFoods);
