import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const typeList = ['all', 'food', 'drink'];

export default function FilteringButtons() {
  const { setFilterRecipes } = useContext(AppContext);

  const handleClick = ({ target: { textContent } }) => {
    if (textContent === 'All') setFilterRecipes('all');
    if (textContent === 'Food') setFilterRecipes('comida');
    if (textContent === 'Drink') setFilterRecipes('bebida');
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
