import React from 'react';
import { RecipeCard } from '.';

export default function RecipeCards(recipeList) {
  const SIX = 6;
  return (
    recipeList && recipeList.slice(0, SIX).map((recipe, index) => (
      <RecipeCard
        key={ recipe.idMeal || recipe.idDrink }
        name={ recipe.strMeal || recipe.strDrink }
        img={ recipe.strMealThumb || recipe.strDrinkThumb }
        index={ index }
        testId="recomendation-card"
      />
    ))
  );
}
