import React from 'react';
import { Link } from 'react-router-dom';
import { string, bool } from 'prop-types';

export default function StartRecipeButton({ doneRecipe, inProgress, id, isFood }) {
  return (
    !doneRecipe
      ? (
        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}/in-progress` }>
          <button
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      )
      : ''
  );
}

StartRecipeButton.propTypes = {
  inProgress: bool.isRequired,
  doneRecipe: bool.isRequired,
  isFood: bool,
  id: string.isRequired,
};

StartRecipeButton.defaultProps = {
  isFood: false,
};
