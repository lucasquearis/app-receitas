import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { Button } from 'react-bootstrap';

const StartRecipe = (props) => {
  const { inProgressRecipes, recipeType, handleStartRecipe, display, detailsId } = props;
  return (
    <div>
      { inProgressRecipes && Object.keys(inProgressRecipes[recipeType])
        .some((recipeId) => recipeId === detailsId)
        ? (
          <Button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
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

StartRecipe.defaultProps = {
  display: {},
  inProgressRecipes: [],
};

StartRecipe.propTypes = {
  inProgressRecipes: arrayOf(shape({ string })),
  recipeType: string.isRequired,
  handleStartRecipe: func.isRequired,
  display: shape({ string }),
  detailsId: string.isRequired,
};

export default StartRecipe;
