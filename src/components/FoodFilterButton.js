import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function FoodFilterButton({ onClick }) {
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
      { filterButtons.map((button, index) => (
        <button
          type="button"
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
};

export default FoodFilterButton;
