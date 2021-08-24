import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const MAX_RECIPES = 12;

  useEffect(() => {
    const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(foodEndpoint)
      .then((res) => res.json())
      .then(({ meals }) => setFoodRecipes(meals));
  }, []);

  return (
    <div>
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
