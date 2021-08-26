import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import getCocktailByID from '../Services/fetchCocktalis';
import getMealByID from '../Services/fetchMeals';

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
  }, [type, recipeID]);

  if (recipe !== {}) {
    return (
      <div className="recipeDetails">
        <img
          width="100%"
          height="200px"
          src={ recipe.strMealThumb }
          alt="Recipe"
          data-testid="recipe-photo"
        />
        <RecipeDetailHeader type={ type } recipe={ recipe } />
        <RecipeDetailIngredients recipe={ recipe } />
        <RecipeDetailInstructions recipe={ recipe } />
        {(type === 'food') && <RecipeDetailVideo videoSource={ recipe.strYoutube } />}
        <RecipeDetailsRecomendations type={ type } />
        <RecipeDetailButton recipeID={ recipeID } />
      </div>
    );
  }

  return (<div>Carregando...</div>);
}

RecipesDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipesDetails;
