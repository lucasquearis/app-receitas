import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function FinishRecipeButton({ disable, recipe, type }) {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  const doneFood = () => {
    const date = new Date();
    const formDate = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    const {
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
      idMeal,
      strTags,
    } = recipe;
    let tags = [];
    if (strTags) {
      tags = strTags.split(',');
    }
    return {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: formDate,
      tags,
    };
  };

  const doneDrink = () => {
    const date = new Date();
    const formDate = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    const {
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      idDrink,
      strTags,
    } = recipe;
    let tags = [];
    if (strTags) {
      tags = strTags.split(',');
    }
    return {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: formDate,
      tags,
    };
  };

  const handleFinishBtn = () => {
    const doneRecipe = [];
    if (type === 'comida') {
      doneRecipe.push(doneFood());
    } else {
      doneRecipe.push(doneDrink());
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    } else {
      const updateDone = [...doneRecipes, ...doneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(updateDone));
    }
    setRedirect(true);
  };

  return (
    <Button
      data-testid="finish-recipe-btn"
      variant="contained"
      color="secondary"
      disabled={ disable }
      onClick={ handleFinishBtn }
    >
      Finalizar Receita
    </Button>
  );
}

FinishRecipeButton.propTypes = {
  recipe: PropTypes.shape(PropTypes.object).isRequired,
  disable: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default FinishRecipeButton;
