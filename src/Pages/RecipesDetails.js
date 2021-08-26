import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipeDetailHeader from '../Components/RecipeDetailHeader';
import RecipeDetailIngredients from '../Components/RecipeDetailIngredients';
import RecipeDetailInstructions from '../Components/RecipeDetailInstructions';
import RecipeDetailVideo from '../Components/RecipeDetailVideo';
import RecipeDetailsRecomendations from '../Components/RecipeDetailsRecomendations';
import RecipeDetailButton from '../Components/RecipeDetailButton';

import './RecipesDetails.css';

function RecipesDetails({ type }) {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (type === 'food') {
      const getFoodRecipe = async () => {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
        const { meals } = await fetch(endpoint).then((data) => data.json());
        setRecipe(meals[0]);
      };
      getFoodRecipe();
    }

    if (type === 'drink') {
      const getDrinkRecipe = async () => {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';
        const { drinks } = await fetch(endpoint).then((data) => data.json());
        setRecipe(drinks[0]);
      };
      getDrinkRecipe();
    }
  }, [type]);

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
        <RecipeDetailButton />
      </div>
    );
  }

  return (<div>Carregando...</div>);
}

RecipesDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipesDetails;
