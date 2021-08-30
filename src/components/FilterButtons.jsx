import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function FilterButtons({ setFilterRecipes }) {
  return (
    <section>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: true,
          filterDrinks: false,
        }) }
      >
        Food
      </Button>

      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: false,
          filterDrinks: true,
        }) }
      >
        Drinks
      </Button>

      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterRecipes({
          filterMeals: false,
          filterDrinks: false,
        }) }
      >
        All
      </Button>
    </section>
  );
}

FilterButtons.propTypes = {
  setFilterRecipes: PropTypes.func.isRequired,
};
