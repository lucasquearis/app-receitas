import React, { useContext } from 'react';
import Context from '../context/Context';

export default function DrinkCategoryButtons() {
  const { btnCategoryDrinks, setListCategoryDrinks } = useContext(Context);
  const CINCO = 5;

  const handleClick = ({ target }) => {
    const { name } = target;
    setListCategoryDrinks(name);
  };

  return (
    <ul>
      { btnCategoryDrinks ? (
        btnCategoryDrinks
          .filter((_item, index) => index < CINCO)
          .map((category) => (
            <button
              type="button"
              name={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ handleClick }
              key={ category.strCategory }
              className="filter-button"
            >
              { category.strCategory }
            </button>
          ))
      ) : null }
    </ul>
  );
}
