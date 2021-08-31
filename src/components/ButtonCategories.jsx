import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ButtonCategories.css'

function ButtonCategories({ handleClick, dataID, value }) {
  return (
    <button
      type="button"
      className="category-btn"
      onClick={ ({ target }) => handleClick(target) }
      data-testid={ dataID }
      value={ value }
    >
      { value }

    </button>
  );
}

export default ButtonCategories;

ButtonCategories.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dataID: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
