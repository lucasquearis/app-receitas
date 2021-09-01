import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import getDetailsInitialButton from '../service/getDetailsInitialButton';
import './DetalheBebida.css';
import * as BebidasAPI from '../service/BebidasAPI';
import getRecipeIngredients from '../service/getRecipeIngredients';
import { buscarComidasAleatoria } from '../service/ComidasAPI';
import useIsFavorite from '../hooks/useIsFavorite';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetalheBebida(props) {
  const { match: { params: { id } } } = props;

  const [drink, setDrink] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [randomFood, setRandomFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useIsFavorite(setFavorite, drink, 'bebida');

  useEffect(() => {
    const getDrink = async () => {
      const drinkResult = await BebidasAPI.buscarBebidaPeloID(id);
      setDrink(drinkResult.drinks[0]);

      const readyIngredients = getRecipeIngredients(drinkResult.drinks);
      setDrinkIngredients(readyIngredients);
      setLoading(false);
    };

    const getRandomFood = async () => {
      const foods = await buscarComidasAleatoria();
      const foodsCount = 6;

      const firstFoods = foods.filter((_food, index) => index < foodsCount);
      setRandomFood(firstFoods);
    };
    getDrink();
    getRandomFood();
  }, [id]);

  const randomFoodCard = () => (
    <section className="food-recomended">
      <h5>Recomendadas</h5>
      <div className="recomended-food-section-infos">
        { randomFood.map((food, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recomended-food-info"
            key={ `${index}-${food.idMeal}` }
          >
            <img src={ food.strMealThumb } alt="foto da bebida" />
            <p>{ food.strCategory }</p>
            <h5 data-testid={ `${index}-recomendation-title` }>{ food.strMeal }</h5>
          </div>
        )) }
      </div>
    </section>
  );

  const setMessageTime = () => {
    const messageTime = 1000;
    setTimeout(() => {
      setCopyMessage(false);
    }, messageTime);
  };

  const onShareClicked = () => {
    copyToClipBoard(window.location.href);
    setCopyMessage(true);
    setMessageTime();
  };

  const onFavoriteClick = () => {
    setFavorite(!favorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFood = {
      id: drink.idDrink,
      type: 'bebida',
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };

    if (favoriteRecipes !== null) {
      if (favorite) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (recipe) => recipe.id !== drink.idDrink,
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

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <section className="food-info">
      { getDetailsInitialButton(drink, 'bebida') }
      <img
        className="food-drink-image"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt="foto da comida"
      />
      <div className="title-drink-info">
        <h4 data-testid="recipe-title">{ drink.strDrink }</h4>
        <div className="share-favorite-drink-section">
          <button
            type="button"
            className="share-drink-btn-icon"
            onClick={ onShareClicked }
          >
            <img
              data-testid="share-btn"
              className="share-drink-icon"
              src={ shareIcon }
              alt="icone de compartilhar"
            />
          </button>
          { isFavorite() }
        </div>
      </div>
      <p
        className="food-drink-category"
        data-testid="recipe-category"
      >
        { drink.strAlcoholic }
      </p>
      { copyMessage
        ? <p className="copy-drink-link-message">Link copiado!</p>
        : <p className="copy-drink-link-message" /> }
      <div className="ingredients-drink-section">
        <h5>Ingredients</h5>
        <ul>
          {
            drinkIngredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${index}` }
              >
                { ingredient }
              </li>
            ))
          }
        </ul>
      </div>
      <div className="instructions-drink-section">
        <h5>Instructions</h5>
        <p data-testid="instructions">{ drink.strInstructions }</p>
      </div>
      { randomFoodCard() }
    </section>
  );
}

DetalheBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
