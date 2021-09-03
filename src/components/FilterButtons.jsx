import React from 'react';
import PropTypes from 'prop-types';

export default function FilterButtons({ setFilterRecipes }) {
  return (
    <section className="container-filter-btn">
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: true,
          filterDrinks: false,
        }) }
        className="filter-btn"
      >
        <span className="label-btn">Food</span>
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: false,
          filterDrinks: true,
        }) }
        className="filter-btn"
      >
        <span className="label-btn">Drinks</span>
      </button>

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: false,
          filterDrinks: false,
        }) }
        className="filter-btn"
      >
        <span className="label-btn">All</span>
      </button>
    </section>
  );
}

FilterButtons.propTypes = {
  setFilterRecipes: PropTypes.func.isRequired,
};
