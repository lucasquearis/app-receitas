import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinksCategories } from '../redux/actions/mainActions';

function CategoryDrinkButtons() {
  const cinco = 5;
  const categories = useSelector(
    (state) => state.reducerCategories.drinksCategories.drinks,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinksCategories());
  }, [dispatch]);

  return (
    <div>
      {
        categories && categories.map((category, index) => index < cinco && (
          <button
            type="button"
            key={ `${category.strCategory}-category-filter` }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}

export default CategoryDrinkButtons;
