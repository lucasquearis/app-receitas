import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';
import getIngredients from '../util/getIngredients';
import getMeasure from '../util/getMeasures';
import getFavoriteFood from '../util/getFavoriteFood';
import onFavoriteFood from '../util/onFavoriteFood';
import Copy from '../components/Clipboard-Copy';

const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const actualPath = pathnameSeparate[2];

  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  function DetailUrl() {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const detailUrl = `${splitUrl[0]}//${splitUrl[2]}/comidas/${actualPath}`;
    Copy(detailUrl);
    setShowMsg(true);
  }

  useEffect(() => {
    fetchMealDetailsApi(actualPath).then((data) => setFoodDetails(data.meals));
  }, [actualPath, setFoodDetails]);

  useEffect(() => {
    getFavoriteFood(foodDetails, setFavorite);
    getIngredients(foodDetails, setIngredients);
    getMeasure(foodDetails, setMeasures);
  }, [foodDetails]);

  return (
    <div>
      {
        foodDetails && foodDetails.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
        }, i) => (
          <div className="details-container" key={ i }>
            <img
              key={ strMealThumb }
              src={ strMealThumb }
              alt="thumbnail"
              data-testid="recipe-photo"
              className="details-image"
            />
            <div className="details-buttons">
              <h1 key={ strMeal } data-testid="recipe-title">{strMeal}</h1>
              <div>
                <button
                  type="button"
                  data-testid="share-btn"
                  key={ shareIcon }
                  onClick={ DetailUrl }
                >
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                <button
                  type="button"
                  onClick={ () => onFavoriteFood(foodDetails, setFavorite, favorite) }
                  key={ blackHeartIcon }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
                    alt="favorite-icon"
                  />
                </button>
              </div>
            </div>
            { showMsg && <p>Link copiado!</p> }
            <h2 data-testid="recipe-category" key={ strCategory }>{strCategory}</h2>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient) => ingredient
                  .map((item, index) => (
                    <li
                      key={ item }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input type="checkbox" id={ item } name={ item } value={ item } />
                      {`${item} - ${measures[0][index]}`}
                    </li>
                  )))
              }
            </ul>
            <p data-testid="instructions" key={ strInstructions }>{strInstructions}</p>
            <Link to="/receitas-feitas">
              <button
                data-testid="finish-recipe-btn"
                key={ i }
                type="button"
                className="start-recipe-btn"
              >
                Finalizar receita
              </button>
            </Link>
          </div>))
      }
    </div>
  );
};

export default RecipeInProgress;
