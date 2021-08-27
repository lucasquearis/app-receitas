import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Context from '../../../context';

function FinishButton({ isReady, recipe, type }) {
  const { setDoneRecipes } = useContext(Context);
  const getFullDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDoneValue = () => {
    const value = type === 'meal' ? {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: getFullDate(),
      tags: recipe.strTags.split(','),
    }
      : {
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: getFullDate(),
        tags: '',
      };
    setDoneRecipes(value);
  };
  return (
    <Link to="/receitas-feitas">
      <Button
        disabled={ !isReady }
        data-testid="finish-recipe-btn"
        variant="primary"
        className="mb-4"
        onClick={ getDoneValue }
      >
        Finalizar Receita
      </Button>
    </Link>
  );
}

FinishButton.propTypes = {
  isReady: PropTypes.bool.isRequired,
  recipe: PropTypes.objectOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FinishButton;
