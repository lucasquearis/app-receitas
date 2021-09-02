import React from 'react';
import PropTypes from 'prop-types';
import { Button, FilterWrapper } from './styles';

function DoneFilters({ filter }) {
  return (
    <FilterWrapper>
      <Button onClick={ () => filter(null) } data-testid="filter-by-all-btn">
        All
      </Button>
      <Button onClick={ () => filter('comida') } data-testid="filter-by-food-btn">
        Food
      </Button>
      <Button onClick={ () => filter('bebida') } data-testid="filter-by-drink-btn">
        Drinks
      </Button>
    </FilterWrapper>
  );
}

DoneFilters.propTypes = {
  filter: PropTypes.func.isRequired,
};

export default DoneFilters;
