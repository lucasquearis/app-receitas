import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import './RecipeDetailButton.css';

const defaultInProgresStorage = {
  cocktails: {},
  meals: {},
};

function RecipeDetailButton({ type, recipe, recipeID }) {
  const [recipeStatus, setRecipeStatus] = useState('Start');
  const { pathname } = useLocation();

  const [ingredientsEMeasuresList, setIngredientsEMeasuresList] = useState([]);

  useEffect(() => {
    const ingredientsList = (Object.entries(recipe))
      .filter((key) => key[0].includes('strIngredient'))
      .filter((ingredient) => ingredient[1] !== null
      && ingredient[1] !== '' && ingredient[1] !== ' ');

    const measuresList = (Object.entries(recipe))
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
  }, [recipe]);

  const verifyItsDone = (recipeIsDone) => {
    if (recipeIsDone) {
      setRecipeStatus('Finished');
    }
  };

  useEffect(() => {
    const verifyIsInProgress = () => {
      const inProgressStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || defaultInProgresStorage;
      const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      if (inProgressStorage !== null && inProgressStorage.cocktails[recipeID]) {
        setRecipeStatus('Continue');
      } else if (inProgressStorage !== null && inProgressStorage.meals[recipeID]) {
        setRecipeStatus('Continue');
      } else if (doneStorage !== null) {
        const recipeIsDone = doneStorage.find((item) => item.id === recipeID);
        verifyItsDone(recipeIsDone);
      }
    };
    verifyIsInProgress();
  }, [recipeID]);

  const startedRecipe = () => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'food') {
      inProgressStorage.meals = {
        ...inProgressStorage.meals,
        [recipeID]: ingredientsEMeasuresList,
      };
    } else {
      inProgressStorage.cocktails = {
        ...inProgressStorage.cocktails,
        [recipeID]: ingredientsEMeasuresList,
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
  };

  const startButton = () => (
    <Link to={ `${pathname}/in-progress` }>
      <Button
        data-testid="start-recipe-btn"
        onClick={ () => startedRecipe() }
        variant="success"
        className="recipeButton"
      >
        Iniciar Receita
      </Button>
    </Link>
  );

  const continueButton = () => (
    <Link to={ `${pathname}/in-progress` }>
      <Button
        className="recipeButton"
        data-testid="start-recipe-btn"
        variant="success"
      >
        Continuar Receita
      </Button>
    </Link>
  );

  return (
    <div className="recipeButtonContainer">
      {
        recipeStatus === 'Start'
        && recipeStatus !== 'Finished'
        && startButton()
      }
      {
        recipeStatus === 'Continue'
        && continueButton()
      }
    </div>
  );
}

RecipeDetailButton.propTypes = {
  recipeID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipeDetailButton;
