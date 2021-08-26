import React, { useContext } from 'react';
import Context from '../context/Context';

function FoodFilterButton() {
  const { foodCategories: { loading, list } } = useContext(Context);

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
        >
          { button.strCategory }
        </button>)) }
    </div>

  );
}

export default FoodFilterButton;
