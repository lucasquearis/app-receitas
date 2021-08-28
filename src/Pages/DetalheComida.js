import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import getDetailsInitialButton from '../service/getDetailsInitialButton';
import './DetalheComida.css';
import useIsFavorite from '../hooks/useIsFavorite';
import * as ComidasAPI from '../service/ComidasAPI';
import * as BebidasAPI from '../service/BebidasAPI';
import getFoodIngredients from '../service/getFoodIngredients';
import RecomendedCard from '../Components/RecomendedCard';
import getEmbedURL from '../service/getEmbedURL';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetalheComida(props) {
  const { match: { params: { id } } } = props;
  const [food, setFood] = useState({});
  const [randomDrinks, setRandomDrinks] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useIsFavorite(setFavorite, food, 'comida');

  useEffect(() => {
    const getFood = async () => {
      const foodResult = await ComidasAPI.buscarComidaPeloID(id);
      setFood(foodResult[0]);
      const readyIngredients = getFoodIngredients(foodResult);
      setFoodIngredients(readyIngredients);
      setLoading(false);
    };

    const getRandomDrink = async () => {
      const drink = await BebidasAPI.buscarBebidaAleatoria();
      const drinksCount = 6;
      const firstDrinks = drink.drinks.filter((_drink, index) => index < drinksCount);
      setRandomDrinks(firstDrinks);
    };
    getFood();
    getRandomDrink();
  }, [id]);

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

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
      id: food.idMeal,
      type: 'comida',
      area: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };

    if (favoriteRecipes !== null) {
      if (favorite) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (recipe) => recipe.id !== food.idMeal,
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

  return (
    <section className="food-info">
      { getDetailsInitialButton(food, 'comida') }
      <img
        className="food-image"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt="foto da comida"
      />
      <div className="title-info">
        <h4 data-testid="recipe-title">{ food.strMeal }</h4>
        <div className="share-favorite-section">
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
        </div>
      </div>
      <p className="food-category" data-testid="recipe-category">{ food.strCategory }</p>
      { copyMessage
        ? <p className="copy-food-link-message">Link copiado!</p>
        : <p className="copy-food-link-message" /> }
      <div className="ingredients-section">
        <h5>Ingredients</h5>
        <ul>
          {
            foodIngredients.map((ingredient, index) => (
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
      <div className="instructions-section">
        <h5>Instructions</h5>
        <p data-testid="instructions">{ food.strInstructions }</p>
      </div>
      <div className="video-section">
        <h5>Video</h5>
        <iframe data-testid="video" title="food-video" src={ getEmbedURL(food) } />
      </div>
      <div className="recomended-drink-section-infos">
        { randomDrinks.map((drink, index) => (
          <RecomendedCard
            key={ `${drink.idDrink}-${index}` }
            recomended={ drink }
            index={ index }
          />
        )) }
      </div>
    </section>
  );
}
DetalheComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
