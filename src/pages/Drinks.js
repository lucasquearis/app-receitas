import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const drinkCategoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    fetch(drinkEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkRecipes(drinks));

    fetch(drinkCategoriesEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkCategories(drinks));
  }, []);

  return (
    <div>
      { drinkCategories.map(({ strCategory }, index) => {
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
      { drinkRecipes.map(({ strDrinkThumb, strDrink }, index) => {
        if (index < MAX_RECIPES) {
          return (
            <RecipeCard
              key={ strDrink }
              thumb={ strDrinkThumb }
              name={ strDrink }
              index={ index }
            />
          );
        }
        return null;
      }) }
    </div>
  );
}

export default Drinks;
