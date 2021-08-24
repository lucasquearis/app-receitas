import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const MAX_RECIPES = 12;

  useEffect(() => {
    const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(drinkEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkRecipes(drinks));
  }, []);

  return (
    <div>
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
