import React from 'react';
import PropTypes from 'prop-types';
import './CategoryButton.css';

export default function CategoryButton({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
    >
      { category }
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string,
}.isRequired;
