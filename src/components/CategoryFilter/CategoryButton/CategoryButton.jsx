import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      // onClick={ handleClick }
    >
      { category }
    </button>);
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
