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
      <Button onClick={ () => filter('all') }>All</Button>
      <Button onClick={ () => filter('comida') }>Food</Button>
      <Button onClick={ () => filter('bebida') }>Drinks</Button>
    </div>
  );
}

Filter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFilteredList: PropTypes.func.isRequired,
};

export default Filter;
