import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function StartRecipeButton(props) {
  const { id, type, enType } = props;
  const newEnType = enType === 'meals' ? enType : 'cocktails';
  const [done, setDone] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setDone(localStorage.getItem('doneRecipes')
      && (JSON.parse(localStorage.getItem('doneRecipes')).some(
        (recipe) => recipe.id === id && type.includes(recipe.type),
      )));
    setInProgress(localStorage.getItem('inProgressRecipes')
      && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[
        newEnType]).some((recipeId) => recipeId === id));
  }, []);

  return (
    <button
      hidden={ done }
      className="start-recipe-button"
      type="button"
      data-testid="start-recipe-btn"
    >
      {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

StartRecipeButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  enType: PropTypes.string.isRequired,
};

export default StartRecipeButton;
