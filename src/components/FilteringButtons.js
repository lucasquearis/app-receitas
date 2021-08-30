import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const typeList = ['all', 'food', 'drink'];

export default function FilteringButtons() {
  const { setFilterDoneRecipes } = useContext(AppContext);

  const handleClick = ({ target: { textContent } }) => {
    if (textContent === 'All') setFilterDoneRecipes('all');
    if (textContent === 'Food') setFilterDoneRecipes('comida');
    if (textContent === 'Drink') setFilterDoneRecipes('bebida');
  };

  return (
    <section className="filter-buttons">
      { typeList.map((type, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `filter-by-${type}-btn` }
          onClick={ handleClick }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      )) }
    </section>
  );
}
