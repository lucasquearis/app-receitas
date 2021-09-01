import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from './BebidasDetalhes.module.css';

import FavoriteButton from '../components/FavoriteButton';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const maxRecommendedRecipes = 6;

const getIngredientsKeys = (cocktail) => Object.keys(cocktail)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
&& cocktail[ingredient] !== null && cocktail[ingredient] !== '');

export default function BebidasDetalhes() {
  const [drink, setDrink] = useState();
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];
  const [recommendedFood, setRecommendedFood] = useState([]);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
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

  async function copyPageUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log('Link copiado!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.getElementById('share-button').innerHTML = 'Link copiado!';
  }

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
      <div data-testid="recipe-glass">{drink.strGlass}</div>
      <div data-testid="recipe-alcoholic">{drink.strCategory}</div>

      <div className={ styles.buttonBebidasDetails }>
        <FavoriteButton
          foodOrDrink={ drink }
          dataTestId="favorite-btn"
        />
        <button
          id="share-button"
          type="button"
          data-testid="share-btn"
          onClick={ copyPageUrl }
        >
          Compartilhar
        </button>
      </div>
      <ul className={ styles.optionsDrinks }>
        {renderIngredients(getIngredientsKeys(drink))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      {recommendedFood.map((recommendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <ul>
            <li
              className={ index <= 1 ? '' : 'displayNone' }
              data-testid={ `${index}-recomendation-title` }
            >
              { recommendation.strMeal }
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
