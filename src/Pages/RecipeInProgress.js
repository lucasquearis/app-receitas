import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getCocktailByID } from '../Services/fetchCocktails';
import { getMealByID } from '../Services/fetchMeals';

import RecipeDetailHeader from '../Components/RecipeDetailHeader';
import RecipeDetailInstructions from '../Components/RecipeDetailInstructions';
import RecipeInProgressIngredients from '../Components/RecipeInProgressIngredients';
import RecipeInProgressButton from '../Components/RecipeInProgressButton';

import './RecipeInProgress.css';

function RecipeInProgress({ type }) {
  const [recipe, setRecipe] = useState({});
  const [ingredientsEMeasuresList, setIngredientsEMeasuresList] = useState([]);
  const { recipeID } = useParams();

  const getIngredients = (data) => {
    const ingredientsList = (Object.entries(data))
      .filter((key) => key[0].includes('strIngredient'))
      .filter((ingredient) => ingredient[1] !== null
      && ingredient[1] !== '' && ingredient[1] !== ' ');

    const measuresList = (Object.entries(data))
      .filter((key) => key[0].includes('strMeasure'))
      .map((measure) => {
        if (measure[1] === null || measure[1] === '') {
          return ' ';
        }
        return measure[1];
      });

    setIngredientsEMeasuresList(ingredientsList
      .map((ingredient, index) => (
        {
          ingredient: `${ingredient[1]} - ${measuresList[index]}`,
          done: false,
        }
      )));
  };

  useEffect(() => {
    if (type === 'food') {
      getMealByID(recipeID).then((data) => {
        setRecipe(data);
        getIngredients(data);
      });
    }

    if (type === 'drink') {
      getCocktailByID(recipeID).then((data) => {
        getIngredients(data);
        setRecipe(data);
      });
    }

    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneStorage === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, [type, recipeID]);

  if (recipe !== {}) {
    return (
      <div className="recipeInProgress">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
          className="recipeInProgressImage"
        />
        <div className="infoContainer">
          <RecipeDetailHeader type={ type } recipe={ recipe } recipeID={ recipeID } />
          <RecipeInProgressIngredients
            ingredientList={ ingredientsEMeasuresList }
            type={ type }
            recipeID={ recipeID }
          />
          <RecipeDetailInstructions recipe={ recipe } />
          <RecipeInProgressButton type={ type } recipe={ recipe } recipeID={ recipeID } />
        </div>
      </div>
    );
  }

  return (<div>Carregando...</div>);
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
