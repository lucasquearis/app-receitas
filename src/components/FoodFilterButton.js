import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './FilterButton.css';

function FoodFilterButton({ onClick, toggle }) {
  const {
    foodCategories: { loading, list },
  } = useContext(Context);

  const filterButtons = [];
  const maxButtons = 5;
  for (let index = 0; index < maxButtons; index += 1) {
    if (loading === false) {
      filterButtons.push(list.meals[index]);
    }
  }

  return (
    <div>
      <button
        type="button"
        className={ toggle === 'All' ? 'toggle-button' : null }
        data-testid="All-category-filter"
        onClick={ (e) => onClick(e) }
      >
        All
      </button>
      { filterButtons.map((button, index) => (
        <button
          type="button"
          className={ toggle === button.strCategory ? 'toggle-button' : null }
          data-testid={ `${button.strCategory}-category-filter` }
          key={ index }
          onClick={ (e) => onClick(e) }
        >
          { button.strCategory }
        </button>)) }
    </div>
  );
}

FoodFilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggle: PropTypes.string.isRequired,
};

export default FoodFilterButton;
