import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import RecipeCard from '../RecipeCard';

function RecipesContainer() {
  const { recipes } = useContext(ContextApp);
  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipeCard key={ index } name={ recipe.strMeal } image={ recipe.strMealThumb } />
      ))}
    </div>
  );
}

export default RecipesContainer;
