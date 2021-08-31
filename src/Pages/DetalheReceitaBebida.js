import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { buscarBebidasID } from '../service/BebidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getRecipeIngredients from '../service/getRecipeIngredients';

const defaultParams = {
  strDrink: '',
  strDrinkThumb: '',
  strCategory: '',
  strInstructions: '',
};

export default function DetalheReceitaBebida(props) {
  const { match: { params: { id } } } = props;
  const [recipe, setRecipe] = useState([defaultParams]);
  const [drinkIngredients, setdrinkIngredients] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [shouldRedirect, changeRedirect] = useState(false);
  const [ingredientsDone, setIngredients] = useState([]);

  useEffect(() => {
    buscarBebidasID(id)
      .then((result) => setRecipe(result))
      .then(() => getRecipeIngredients(recipe))
      .then((ingredients) => setdrinkIngredients(ingredients))
      .then(() => changeLoading(false));

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progressRecipes) {
      const inProgress = JSON.stringify({ cocktails: { }, meals: { } });
      return localStorage.setItem('inProgressRecipes', inProgress);
    }

    if (progressRecipes.cocktails[id] && progressRecipes.cocktails[id].length > 0) {
      return setIngredients(progressRecipes.cocktails[id]);
    }
  }, [id, recipe]);

  const saveIngredients = ({ target }) => {
    if (ingredientsDone.includes(target.id)) {
      const newIngredients = ingredientsDone.filter((ingr) => ingr !== target.id);
      setIngredients(newIngredients);
    } else {
      setIngredients([...ingredientsDone, target.id]);
    }
  };

  const redirectTo = () => {
    changeRedirect(true);
  };

  const saveToLocalStorage = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgress.cocktails[id] = ingredientsDone;
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const isChecked = (idIngr) => {
    if (ingredientsDone) {
      const checkID = ingredientsDone.some((ingr) => ingr === idIngr.toString());
      return checkID;
    }
  };

  const disabledButton = () => {
    if (drinkIngredients.length === ingredientsDone.length) {
      return false;
    }
    return true;
  };

  const renderRecipe = () => {
    const { strDrink, strDrinkThumb, strCategory, strInstructions } = recipe[0];
    return (
      <>
        {saveToLocalStorage()}
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <section>
          <div>
            <h4 data-testid="recipe-title">
              { strDrink }
            </h4>
            <button
              type="button"
              className="share-food-btn-icon"
              onClick={ onShareClicked }
            >
              <img
                data-testid="share-btn"
                className="share-icon"
                src={ shareIcon }
                alt="icone de compartilhar"
              />
            </button>
            <button
              type="button"
              className="favorite-btn-icon"
            >
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="icone de favoritar"
              />
            </button>
          </div>
          <p data-testid="recipe-category">{ strCategory }</p>
        </section>
        <section className="ingredients-section">
          <h5>Ingredients</h5>
          {
            drinkIngredients.map((ingredient, index) => (
              <div key={ `${index}` } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  id={ index }
                  onClick={ saveIngredients }
                  defaultChecked={ isChecked(index) }
                />
                <label htmlFor={ index }>
                  { ingredient }
                </label>
              </div>
            ))
          }
          <p data-testid="instructions">{strInstructions}</p>
        </section>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ redirectTo }
          disabled={ disabledButton() }
        >
          Finalizar Receita
        </button>
      </>
    );
  };

  return (
    <>
      { isLoading ? <p>Loading...</p> : renderRecipe() }
      { copyMessage
        ? <p className="copy-food-link-message">Link copiado!</p>
        : <p className="copy-food-link-message" /> }
      { shouldRedirect && <Redirect to="/receitas-feitas" /> }
    </>
  );
}

DetalheReceitaBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
