import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodCategoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    fetch(foodEndpoint)
      .then((res) => res.json())
      .then(({ meals }) => setFoodRecipes(meals));

    fetch(foodCategoriesEndpoint)
      .then((res) => res.json())
      .then(({ meals }) => setFoodCategories(meals));
  }, []);

  return (
    <div>
      { foodCategories.map(({ strCategory }, index) => {
        if (index < MAX_CATEGORIES) {
          return (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory }
            >
              { strCategory }
            </button>
          );
        }
        return null;
      }) }
      { foodRecipes.map(({ strMealThumb, strMeal }, index) => {
        if (index < MAX_RECIPES) {
          return (
            <RecipeCard
              key={ strMeal }
              thumb={ strMealThumb }
              name={ strMeal }
              index={ index }
            />
          );
        }
        return null;
      }) }
    </div>
  );
}

export default Foods;
