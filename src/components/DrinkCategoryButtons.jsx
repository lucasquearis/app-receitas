import React, { useContext } from 'react';
import Context from '../context/Context';
import { useFetchCategoryApiDrinks } from '../customHooks/useFetchCategoryApi';
import { useFetchCategoryListApiDrinks } from '../customHooks/useFetchCategoryListApi';

export default function DrinkCategoryButtons() {
  const { btnCategoryDrinks, setListCategoryDrinks } = useContext(Context);
  const CINCO = 5;

  useFetchCategoryApiDrinks();
  useFetchCategoryListApiDrinks();

  const handleClick = ({ target }) => {
    const { name } = target;
    setListCategoryDrinks(name);
  };

  return (
    <ul>
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ handleClick }
        className="filter-button"
      >
        All
      </button>
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
