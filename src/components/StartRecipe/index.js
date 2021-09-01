import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { string, arrayOf, shape } from 'prop-types';
import { Button } from 'react-bootstrap';
import { getLocalStorage } from '../../utils';

const StartRecipe = ({ recipeType, ingredients }) => {
  const history = useHistory();
  const { id } = useParams();
  const [display, setDisplay] = useState({});
  const recipeParam = recipeType === 'meals' ? 'comidas' : 'bebidas';
  const inProgressRecipes = getLocalStorage('inProgressRecipes');

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    if (doneRecipes.some((recipe) => recipe.id === id)) {
      setDisplay({ display: 'none' });
    }
  }, [id]);

  const handleStartRecipe = () => {
    const newInprogress = {
      ...inProgressRecipes,
      [recipeType]: { ...inProgressRecipes[recipeType], [id]: ingredients },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogress));
    history.push(`/${recipeParam}/${id}/in-progress`);
  };

  const handleResumeRecipe = () => {
    history.push(`/${recipeParam}/${id}/in-progress`);
  };

  return (
    <div>
      { Object.keys(inProgressRecipes[recipeType]).some((recipeId) => recipeId === id)
        ? (
          <Button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleResumeRecipe }
          >
            Continuar Receita
          </Button>
        )
        : (
          <Button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
            style={ display }
          >
            Start recipe
          </Button>
        ) }
    </div>
  );
};

StartRecipe.propTypes = {
  recipeType: string.isRequired,
  ingredients: arrayOf(shape({ name: string, measure: string })).isRequired,
};

export default StartRecipe;
