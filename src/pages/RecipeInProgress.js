import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchMealDetailsApi } from '../services/fetchMealApi';
import getIngredients from '../util/getIngredients';
import getMeasure from '../util/getMeasures';
import getFavorite from '../util/getFavorite';
// import Copy from '../components/Clipboard-Copy';

const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const actualPath = pathnameSeparate[2];

  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showMsg] = useState(false);

  function onFavorite() {
    setFavorite(!favorite);

    const {
      idMeal: id,
      strCategory: category,
      strArea: area,
      strMeal: name,
      strMealThumb: image,
    } = foodDetails[0];

    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const item = { id, type: 'comida', area, category, alcoholicOrNot: '', name, image };

    if (actualStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([item]));
      return;
    }

    if (!favorite) {
      actualStorage.push(item);
      localStorage.setItem('favoriteRecipes', JSON.stringify(actualStorage));
    } else {
      const newStorage = actualStorage.filter(
        (favoriteItem) => favoriteItem.id !== item.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  }

  useEffect(() => {
    fetchMealDetailsApi(actualPath).then((data) => setFoodDetails(data.meals));
  }, [actualPath, setFoodDetails]);

  useEffect(() => {
    getFavorite(foodDetails, setFavorite);
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
            <h1 key={ strMeal } data-testid="recipe-title">{strMeal}</h1>
            <button
              type="button"
              data-testid="share-btn"
              key={ shareIcon }
            >
              <img
                src={ shareIcon }
                alt="share-icon"
                className="detail-img-btn"
              />
            </button>
            <button
              type="button"
              onClick={ onFavorite }
              key={ blackHeartIcon }
            >
              <img
                data-testid="favorite-btn"
                className="detail-img-btn"
                src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
                alt="favorite-icon"
              />
            </button>
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
                      <input type="checkbox" id={ item } name={ item } />
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
