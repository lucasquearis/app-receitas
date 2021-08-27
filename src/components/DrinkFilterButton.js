import React, { useContext } from 'react';
import Context from '../context/Context';

function DrinkFilterButton() {
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
        >
          { button.strCategory }
        </button>
      )) }
    </div>
  );
}

export default DrinkFilterButton;
