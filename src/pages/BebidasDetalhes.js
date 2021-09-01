import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from './BebidasDetalhes.module.css';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const maxRecommendedRecipes = 6;

const getFavorite = (drink) => ({
  id: drink.idDrink,
  type: 'bebida',
  area: '',
  category: drink.strCategory,
  alcoholicOrNot: drink.strAlcoholic,
  name: drink.strDrink,
  image: drink.strDrinkThumb,
});

const getIngredientsKeys = (cocktail) => Object.keys(cocktail)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
&& cocktail[ingredient] !== null && cocktail[ingredient] !== '');

export default function BebidasDetalhes() {
  const [drink, setDrink] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];
  const [recommendedFood, setRecommendedFood] = useState([]);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
      const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favoriteFound = lastSave
        .find((recipe) => recipe.id === data.drinks[0].idDrink);
      if (favoriteFound) {
        setIsFavorite(Object.values(favoriteFound)[0]);
      } else {
        setIsFavorite(false);
      }
    };
    api();
  }, [idApi]);

  useEffect(() => {
    const apiFood = async () => {
      const data = await fetch(URL_FOOD).then((response) => response.json());
      const recommendedRecipes = await data.meals.slice(0, maxRecommendedRecipes);
      setRecommendedFood(recommendedRecipes);
    };
    apiFood();
  }, []);

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {` ${drink[ingredientKey]} - ${drink[`strMeasure${index + 1}`]}`}
      </li>));

  const handleFavorite = () => {
    const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (lastSave.find((recipe) => recipe.id === drink.idDrink)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        lastSave.filter((recipe) => recipe.id !== drink.idDrink),
      ));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...lastSave, getFavorite(drink)],
      ));
      setIsFavorite(true);
    }
  };

  const copyPathname = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('share-button').innerHTML = 'Link copiado!';
    // alert('Link copiado!');
  };

  if (drink === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <div className={ styles.bebidasDetails }>
        <img
          src={ drink.strDrinkThumb }
          alt="recipe"
          data-testid="recipe-photo"
          className={ styles.imgBebidasDetails }
        />
      </div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <div data-testid="recipe-category">{drink.strAlcoholic}</div>
      {console.log(drink)}
      <div data-testid="recipe-glass">{drink.strGlass}</div>
      <div data-testid="recipe-alcoholic">{drink.strCategory}</div>

      <div className={ styles.buttonBebidasDetails }>
        <button
          id="share-button"
          type="button"
          data-testid="share-btn"
          onClick={ copyPathname }
        >
          Compartilhar
        </button>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt={ `Botão para adicionar ou retirar ${drink.strDrink} dos favoritos` }
          />
        </button>
      </div>
      <ul className={ styles.optionsDrinks }>
        {renderIngredients(getIngredientsKeys(drink))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      {recommendedFood.map((recomendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <ul>
            <li
              className={ index <= 1 ? '' : 'displayNone' }
              data-testid={ `${index}-recomendation-title` }
            >
              { recomendation.strMeal }
            </li>
          </ul>
        </div>
      ))}
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${idApi}/in-progress`) }
      >
        Iniciar receita
      </button>
    </div>
  );
}
