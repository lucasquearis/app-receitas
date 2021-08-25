import React, { useContext } from 'react';
import Context from '../context/Context';
import { useFetchCategoryApiMeals } from '../customHooks/useFetchCategoryApi';
import { useFetchCategoryListApiMeals } from '../customHooks/useFetchCategoryListApi';

export default function MealCategoryButtons() {
  const { btnCategoryMeals, setListCategoryMeals } = useContext(Context);
  const CINCO = 5;

  useFetchCategoryApiMeals();
  useFetchCategoryListApiMeals();

  const handleClick = ({ target }) => {
    const { name } = target;
    setListCategoryMeals(name);
  };

  return (
    <ul>
      { btnCategoryMeals ? (
        btnCategoryMeals
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
