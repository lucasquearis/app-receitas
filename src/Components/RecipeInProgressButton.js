import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AppContext from '../Context/AppContext';

import './RecipeInProgressButton.css';

function RecipeInProgressButton({ type, recipe, recipeID }) {
  const { globalState } = useContext(AppContext);

  const finishRecipe = () => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (type === 'food' && inProgressStorage !== null) {
      delete inProgressStorage.meals[recipeID];
    }
    if (type === 'drink' && inProgressStorage !== null) {
      delete inProgressStorage.cocktails[recipeID];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));

    // Lógica de pegar data retirada do site https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    let arrayOfTags = [];
    if (recipe.strTags !== null && recipe.strTags !== undefined) {
      arrayOfTags = recipe.strTags.split(',');
    }

    const madeRecipeObject = {
      id: recipeID,
      type: (type === 'food' ? 'comida' : 'bebida'),
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: dataAtual,
      tags: arrayOfTags,
    };
    const newDoneRecipesStorage = [
      ...doneRecipesStorage,
      madeRecipeObject,
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesStorage));
  };

  return (
    <div className="recipeInProgressButtonContainer">
      <Link to="/receitas-feitas">
        <Button
          data-testid="finish-recipe-btn"
          variant="success"
          onClick={ () => finishRecipe() }
          disabled={ !globalState.madeRecipe }
          className="recipeButton"
        >
          Finalizar Receita
        </Button>
      </Link>
    </div>
  );
}

RecipeInProgressButton.propTypes = {
  recipeID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};

export default RecipeInProgressButton;
