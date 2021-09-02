import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function FinishRecipeButton({ setRedirectToDone }) {
  const { allChecked, recipeDetails } = useContext(AppContext);

  const sendDoneRecipe = () => {
    const doneRecipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

    /* Source: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/ */
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    const newDoneRecipe = {
      id: recipeDetails.idMeal || recipeDetails.idDrink,
      type: recipeDetails.idMeal ? 'comida' : 'bebida',
      area: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      doneDate: dataAtual,
      tags: recipeDetails.strTags || [],
    };
    const updateLS = [...doneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updateLS));
  };

  const handleClick = () => {
    sendDoneRecipe();
    setRedirectToDone(true);
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !allChecked }
      onClick={ handleClick }
    >
      Finalizar Receita
    </button>
  );
}

FinishRecipeButton.propTypes = {
  setRedirectToDone: PropTypes.func.isRequired,
};
