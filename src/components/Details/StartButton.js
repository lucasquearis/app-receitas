import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

export default function StartButton(props) {
  const { category, id } = props;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const isDone = (ID, cat) => {
    if (!doneRecipes) return false;
    const type = cat === 'comidas' ? 'comida' : 'bebida';
    for (let index = 0; index < doneRecipes.length; index += 1) {
      if (parseFloat(doneRecipes[index].id) === parseFloat(ID)
       && doneRecipes[index].type === type) {
        return true;
      }
    }
    return false;
  };

  const isInProgress = () => {
    if (!inProgressRecipes) return false;
    const inProgress = inProgressRecipes.meals || inProgressRecipes.cocktails || false;
    const data = Object.keys(inProgress);
    return data.includes(id);
  };

  return (
    <Link to={ `/${category}/${id}/in-progress` }>
      <button
        className="btn"
        type="button"
        data-testid="start-recipe-btn"
        hidden={ isDone(id, category) }
      >
        {isInProgress() ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </Link>
  );
}

StartButton.propTypes = {
  id: string.isRequired,
  category: string.isRequired,
};
