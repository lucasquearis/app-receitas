import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import RecipeCard from '../RecipeCard';

function RecipesContainer() {
  const { recipes } = useContext(ContextApp);
  const maxRecipes = 12;
  return (
    <div>
      {recipes.map((recipe, index) => {
        if (index < maxRecipes) {
          return (
            <RecipeCard
              key={ index }
              name={ recipe.strMeal || recipe.strDrink }
              image={ recipe.strMealThumb || recipe.strDrinkThumb }
              testId={ `${index}-recipe-card` }
              index={ index }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default RecipesContainer;
