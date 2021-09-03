import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getCocktailByID } from '../Services/fetchCocktails';
import { getMealByID } from '../Services/fetchMeals';

import RecipeDetailHeader from '../Components/RecipeDetailHeader';
import RecipeDetailIngredients from '../Components/RecipeDetailIngredients';
import RecipeDetailInstructions from '../Components/RecipeDetailInstructions';
import RecipeDetailVideo from '../Components/RecipeDetailVideo';
import RecipeDetailsRecomendations from '../Components/RecipeDetailsRecomendations';
import RecipeDetailButton from '../Components/RecipeDetailButton';

import './RecipesDetails.css';

function RecipesDetails({ type }) {
  const [recipe, setRecipe] = useState({});
  const { recipeID } = useParams();

  useEffect(() => {
    if (type === 'food') {
      getMealByID(recipeID).then((data) => setRecipe(data));
    }

    if (type === 'drink') {
      getCocktailByID(recipeID).then((data) => setRecipe(data));
    }

    const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneStorage === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }

    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, [type, recipeID]);

  if (recipe !== {}) {
    return (
      <div className="recipeDetails">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
          className="recipeDetailImage"
        />
        <div className="infoContainer">
          <RecipeDetailHeader type={ type } recipe={ recipe } recipeID={ recipeID } />
          <RecipeDetailIngredients recipe={ recipe } />
          <RecipeDetailInstructions recipe={ recipe } />
          {(type === 'food') && <RecipeDetailVideo videoSource={ recipe.strYoutube } />}
          <RecipeDetailsRecomendations type={ type } />
          <RecipeDetailButton type={ type } recipe={ recipe } recipeID={ recipeID } />
        </div>
      </div>
    );
  }

  return (<div>Carregando...</div>);
}

RecipesDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipesDetails;
