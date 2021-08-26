import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function Filter({ list, setFilteredList }) {
  const filter = (value) => {
    if (value === 'all') {
      setFilteredList(list);
    } else {
      const filteredValues = list.filter((item) => item.type === value);
      setFilteredList(filteredValues);
    }
  };
  return (
    <div className="filters-container">
      <Button
        data-testid="filter-by-all-btn"
        onClick={ () => filter('all') }
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        onClick={ () => filter('comida') }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('bebida') }
      >
        Drinks
      </Button>
    </div>
  );
}

Filter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFilteredList: PropTypes.func.isRequired,
};

export default Filter;
