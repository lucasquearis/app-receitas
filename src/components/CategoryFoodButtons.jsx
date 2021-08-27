import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory, clearSearch } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function CategoryFoodButtons() {
  const cinco = 5;
  const doze = 12;
  const categories = useSelector((state) => state.reducerCategories.categories.meals);
  const dispatch = useDispatch();
  const [categoryClick, setCategoryClick] = useState([]);

  const renderCategoryFilter = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setCategoryClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCategory());
    renderCategoryFilter();
  }, [dispatch]);

  const handleClick = (categoryStr) => {
    renderCategoryFilter(categoryStr);
    dispatch(clearSearch());
  };

  return (
    <div>
      {
        categories && categories.map((category, index) => index < cinco && (
          <button
            type="button"
            key={ `${category.strCategory}-category-filter` }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))
      }
      {
        categoryClick.meals && categoryClick.meals.map((dish, index) => index < doze && (
          <ItemCard
            title={ dish.strMeal }
            // data-testid={ `${index}-recipe-card` }
            thumb={ dish.strMealThumb }
            id={ dish.idMeal }
            index={ index }
            key={ index }
          />
        ))
      }
    </div>
  );
}

export default CategoryFoodButtons;
