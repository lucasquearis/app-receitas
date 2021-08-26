import React from 'react';
import { string } from 'prop-types';

export default function StartButton(props) {
  const { category, id } = props;

  const doneRecipes = [{
    id: 5297,
    type: 'comidas',
  }];

  const inProgressRecipes = {
    cocktails: {
    },
    meals: {
      5297: [],
    },
  };

  const isDone = (ID, cat) => {
    for (let index = 0; index < doneRecipes.length; index += 1) {
      if (parseFloat(doneRecipes[index].id) === parseFloat(ID)
       && doneRecipes[index].type === cat) {
        return true;
      }
    }
    return false;
  };

  const isInProgress = (ID, cat) => {
    const inProgress = cat.toLowerCase() === 'comidas'
      ? inProgressRecipes.meals
      : inProgressRecipes.cocktails;
    const data = Object.keys(inProgress);
    return data.includes(id);
  };

  return (
    <button
      className="btn"
      type="button"
      data-testid="start-recipe-btn"
      disabled={ isDone(id, category) }
    >
      {isInProgress(id, category) ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

StartButton.propTypes = {
  id: string.isRequired,
  category: string.isRequired,
};
