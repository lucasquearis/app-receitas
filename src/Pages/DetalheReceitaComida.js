import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import copyToClipBoard from 'clipboard-copy';
import { buscarComidaPeloID } from '../service/ComidasAPI';
import useIsFavorite from '../hooks/useIsFavorite';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getRecipeIngredients from '../service/getRecipeIngredients';
import * as functions from '../service/InProgressRecipe';

const defaultParams = {
  strMeal: '',
  strMealThumb: '',
  strCategory: '',
  strInstructions: '',
};

export default function DetalheReceitaComida(props) {
  const { match: { params: { id } } } = props;
  const [recipe, setRecipe] = useState([defaultParams]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [shouldRedirect, changeRedirect] = useState(false);
  const [ingredientsDone, setIngredients] = useState([]);
  const [copyMessage, setCopyMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    buscarComidaPeloID(id)
      .then((result) => setRecipe(result))
      .then(() => getRecipeIngredients(recipe))
      .then((ingredients) => setFoodIngredients(ingredients))
      .then(() => changeLoading(false));

    functions.setLocalStorage(setIngredients, id, 'meals');
  }, [id, recipe]);

  useIsFavorite(setFavorite, recipe[0], 'comida');

  const setMessageTime = () => {
    const messageTime = 1000;
    setTimeout(() => {
      setCopyMessage(false);
    }, messageTime);
  };

  const onShareClicked = () => {
    const URL = `http://localhost:3000/comidas/${id}`;
    copyToClipBoard(URL);
    setCopyMessage(true);
    setMessageTime();
  };

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

  const onFavoriteClick = () => {
    setFavorite(!favorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFood = {
      id: recipe[0].idMeal,
      type: 'comida',
      area: recipe[0].strArea,
      category: recipe[0].strCategory,
      alcoholicOrNot: '',
      name: recipe[0].strMeal,
      image: recipe[0].strMealThumb,
    };

    if (favoriteRecipes !== null) {
      if (favorite) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (receita) => receita.id !== recipe[0].idMeal,
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        return;
      }
      const newFavoriteRecipes = [...favoriteRecipes, newFood];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      return;
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([newFood]));
  };

  const isFavorite = () => {
    if (favorite) {
      return (
        <button
          type="button"
          className="favorite-btn-icon"
          onClick={ onFavoriteClick }
        >
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="icone de favoritar"
          />
        </button>
      );
    }
    return (
      <button
        type="button"
        className="favorite-btn-icon"
        onClick={ onFavoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="icone de favoritar"
        />
      </button>
    );
  };

  const renderRecipe = () => {
    const { strMeal, strMealThumb, strCategory, strInstructions } = recipe[0];
    return (
      <>
        {functions.saveIngrediensInLocalStorage(ingredientsDone, id, 'meals')}
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <section>
          <div>
            <h4 data-testid="recipe-title">
              { strMeal }
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
            { isFavorite() }
            { copyMessage
              ? <p className="copy-food-link-message">Link copiado!</p>
              : <p className="copy-food-link-message" /> }
          </div>
          <p data-testid="recipe-category">{ strCategory }</p>
        </section>
        <section className="ingredients-section">
          <h5>Ingredients</h5>
          {
            foodIngredients.map((ingredient, index) => (
              <div key={ `${index}` } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  id={ index }
                  onClick={ saveIngredients }
                  defaultChecked={ functions.isChecked(index, ingredientsDone) }
                />
                <label htmlFor={ index }>
                  { ingredient }
                </label>
              </div>
            ))
          }
        </section>
        <p data-testid="instructions">{strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ redirectTo }
          disabled={ functions.enableButton(foodIngredients, ingredientsDone) }
        >
          Finalizar Receita
        </button>
      </>
    );
  };

  return (
    <>
      { isLoading ? <p>Loading...</p> : renderRecipe() }
      { shouldRedirect && <Redirect to="/receitas-feitas" /> }
    </>
  );
}

DetalheReceitaComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
