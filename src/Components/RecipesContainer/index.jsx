import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import RecipeCard from '../RecipeCard';
import './style.css';

function RecipesContainer() {
  const { recipes } = useContext(ContextApp);
  const number = 12;
  return (
    <div className="recipe-container">
      {recipes.slice(0, number).map((recipe, index) => (
        <RecipeCard
          key={ index }
          name={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
          testId={ `${index}-recipe-card` }
          index={ index }
          id={ recipe.idMeal || recipe.idDrink }
          feedType={ recipe.idMeal ? 'comidas' : 'bebidas' }
        />
      ))}
    </div>
  );
}

export default RecipesContainer;
