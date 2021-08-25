import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton(props) {
  const { strCategory, handleClick } = props;

  return (
    <button
      data-testid={ `${strCategory}-category-filter` }
      name="category-filter"
      type="button"
      onClick={ handleClick }
    >
      { strCategory }
    </button>
  );
}

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CategoryButton;
