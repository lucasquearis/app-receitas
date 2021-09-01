import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './ComidasDetalhes.css';
import Loading from '../components/Loading';
import styles from './ComidasDetalhes.module.css';

import FavoriteButton from '../components/FavoriteButton';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const maxRecommendedRecipes = 6;

const getIngredientsKeys = (meal) => Object.keys(meal)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && meal[ingredient] !== null && meal[ingredient] !== '');

export default function ComidasDetalhes() {
  const [food, setFood] = useState();
  const [recommendedDrinks, setRecommendedDrink] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      setFood(data.meals[0]);
    };
    api();
  }, [idApi]);

  useEffect(() => {
    const apiDrink = async () => {
      const data = await fetch(URL_DRINK).then((response) => response.json());
      const recommendedRecipes = await data.drinks.slice(0, maxRecommendedRecipes);
      setRecommendedDrink(recommendedRecipes);
    };
    apiDrink();
  }, []);

  async function copyPageUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log('Link copiado!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.getElementById('share-button').innerHTML = 'Link copiado!';
  }

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {`${food[ingredientKey]} - ${food[`strMeasure${index + 1}`]}`}
      </li>));

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <div className={ styles.comidasDetails }>
        <img
          src={ food.strMealThumb }
          alt="recipe"
          data-testid="recipe-photo"
          className={ styles.imgComidasDetails }
        />
      </div>
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <p data-testid="recipe-category">{food.strCategory}</p>

      <div>
        <div className={ styles.buttonComidasDetails }>
          <FavoriteButton
            foodOrDrink={ food }
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

        <ul>
          {renderIngredients(getIngredientsKeys(food))}
        </ul>

        <p data-testid="instructions">{food.strInstructions}</p>
      </div>

      <div className={ styles.videoComida }>
        <iframe
          src={ food.strYoutube }
          title="Vídeo de Instrução"
          data-testid="video"
        />
      </div>

      {recommendedDrinks.map((recommendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <ul>
            <li
              className={ index <= 1 ? '' : 'displayNone' }
              data-testid={ `${index}-recomendation-title` }
            >
              { recommendation.strDrink }
            </li>
          </ul>
        </div>
      ))}

      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/comidas/${idApi}/in-progress`) }
      >
        Iniciar receita
      </button>
    </div>
  );
}
