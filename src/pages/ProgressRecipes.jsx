import React from 'react';
import { Spinner } from 'react-bootstrap';
import ingredientsDetails from '../helpers/getIngredients';
import RecipeDetailCard from '../components/RecipeDetailCard';
import useProgressRecipes from '../hooks/useProgressRecipes';
import '../styles/progressRecipes.css';

export default function ProgressRecipes() {
  const { loading, recipes, data } = useProgressRecipes();

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ data.recipeId }
          key={ data.recipeId }
          img={ data.image }
          title={ data.title }
          category={ data.alcoholic }
          ingredients={
            data.recipeId ? ingredientsDetails(recipes).map((item, index) => (
              <div key={ index } className="recipes-checkbox">
                <label data-testid={ `${index}-ingredient-step` } htmlFor={ item }>
                  <input
                    type="checkbox"
                    id={ item }
                    value={ item }
                  />
                  <span>{ item }</span>
                </label>
              </div>
            )) : []
          }
          instructions={ data.instructions }
          showRecomendations={ false }
        />
      )}
    </div>
  );
}
