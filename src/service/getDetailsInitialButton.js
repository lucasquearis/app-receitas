import React from 'react';
import { Link } from 'react-router-dom';

const getRecipeInProgress = (recipeInProgress, recipe, type) => {
  if (recipeInProgress) {
    if (type === 'comida') {
      return (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          <Link
            className="start-recipe-food-btn-link"
            to={ `/comidas/${recipe.idMeal}/in-progress` }
          >
            Continuar Receita
          </Link>
        </button>
      );
    }
    return (
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        <Link
          className="start-recipe-food-btn-link"
          to={ `/bebidas/${recipe.idDrink}/in-progress` }
        >
          Continuar Receita
        </Link>
      </button>
    );
  }
  return (
    <button
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      type="button"
    >
      <Link
        className="start-recipe-food-btn-link"
        to={ `/bebidas/${recipe.idDrink}/in-progress` }
      >
        Continuar Receita
      </Link>
    </button>
  );
};

const getDrinkButton = (doneRecipes, recipe, inProgressRecipes) => {
  if (doneRecipes !== null) {
    const alredyDone = doneRecipes.some(
      (recipeDone) => recipeDone.id === recipe.idDrink,
    );
    if (!alredyDone) {
      console.log('receita ainda não feita');
      return (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          <Link
            className="start-recipe-food-btn-link"
            to={ `/bebidas/${recipe.idDrink}/in-progress` }
          >
            Iniciar Receita
          </Link>
        </button>
      );
    }
    return (
      <button
        className="start-recipe-btn-invisible"
        data-testid="start-recipe-btn"
        type="button"
      >
        <Link
          className="start-recipe-food-btn-link"
          to={ `/bebidas/${recipe.idDrink}/in-progress` }
        >
          Iniciar Receita
        </Link>
      </button>
    );
  }
  if (inProgressRecipes !== null) {
    const ids = Object.keys(inProgressRecipes.cocktails);
    const recipeInProgress = ids.some((id) => id === recipe.idMeal);
    return getRecipeInProgress(recipeInProgress, recipe, 'drink');
  }
  return (
    <button
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      type="button"
    >
      <Link
        className="start-recipe-food-btn-link"
        to={ `/bebidas/${recipe.idDrink}/in-progress` }
      >
        Iniciar Receita
      </Link>
    </button>
  );
};

export default function getDetailsInitialButton(recipe, type) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (type === 'comida') {
    if (doneRecipes !== null) {
      const alredyDone = doneRecipes.some(
        (recipeDone) => recipeDone.id === recipe.idMeal,
      );
      if (!alredyDone) {
        console.log('receita ainda não feita');
        return (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
          >
            <Link
              className="start-recipe-food-btn-link"
              to={ `/comidas/${recipe.idMeal}/in-progress` }
            >
              Iniciar Receita
            </Link>
          </button>
        );
      }
      return (
        <button
          className="start-recipe-btn-invisible"
          data-testid="start-recipe-btn"
          type="button"
        >
          <Link
            className="start-recipe-food-btn-link"
            to={ `/comidas/${recipe.idMeal}/in-progress` }
          >
            Iniciar Receita
          </Link>
        </button>
      );
    }
    if (inProgressRecipes !== null) {
      const ids = Object.keys(inProgressRecipes.meals);
      const recipeInProgress = ids.some((id) => id === recipe.idMeal);
      return getRecipeInProgress(recipeInProgress, recipe, 'comida');
    }
    return (
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        <Link
          className="start-recipe-food-btn-link"
          to={ `/comidas/${recipe.idMeal}/in-progress` }
        >
          Iniciar Receita
        </Link>
      </button>
    );
  }
  return getDrinkButton(doneRecipes, recipe, inProgressRecipes);
}
