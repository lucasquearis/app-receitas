import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function DrinkFilterButton({ onClick }) {
  const { drinkCategories: { loading, list } } = useContext(Context);

  const filterButtons = [];
  const maxButtons = 5;
  for (let index = 0; index < maxButtons; index += 1) {
    if (loading === false) {
      filterButtons.push(list.drinks[index]);
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
        </button>
      )) }
    </div>
  );
}

DrinkFilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DrinkFilterButton;
