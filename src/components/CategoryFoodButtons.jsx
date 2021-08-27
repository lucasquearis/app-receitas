import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory } from '../redux/actions/mainActions';

function CategoryFoodButtons() {
  const cinco = 5;
  const categories = useSelector((state) => state.reducerCategories.categories.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
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

export default CategoryFoodButtons;
