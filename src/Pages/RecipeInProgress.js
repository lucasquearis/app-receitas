import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getCocktailByID } from '../Services/fetchCocktails';
import { getMealByID } from '../Services/fetchMeals';

import RecipeDetailHeader from '../Components/RecipeDetailHeader';
import RecipeDetailInstructions from '../Components/RecipeDetailInstructions';
import RecipeInProgressIngredients from '../Components/RecipeInProgressIngredients';

function RecipeInProgress({ type }) {
  const [recipe, setRecipe] = useState({});
  const { recipeID } = useParams();

  useEffect(() => {
    if (type === 'food') {
      getMealByID(recipeID).then((data) => setRecipe(data));
    }

    if (type === 'drink') {
      getCocktailByID(recipeID).then((data) => setRecipe(data));
    }

    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneStorage === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, [type, recipeID]);

  if (recipe !== {}) {
    return (
      <div className="recipeDetails">
        <img
          width="100%"
          height="200px"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
        />
        <RecipeDetailHeader type={ type } recipe={ recipe } recipeID={ recipeID } />
        <RecipeInProgressIngredients type={ type } recipeID={ recipeID } />
        <RecipeDetailInstructions recipe={ recipe } />

        {/* Botão de Finalizar Receita ->
        <RecipeDetailButton type={ type } recipe={ recipe } recipeID={ recipeID } /> */}
      </div>
    );
  }

  return (<div>Carregando...</div>);
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
