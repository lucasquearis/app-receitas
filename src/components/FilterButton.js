import React from 'react';
import PropTypes from 'prop-types';

function FilterButton(categoryName) {
  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
    >
      { categoryName }
    </button>
  );
}

FilterButton.propTypes = {
  categoryName: PropTypes.arrayOf(PropTypes.string),
}

export default FilterButton;
