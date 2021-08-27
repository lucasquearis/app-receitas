import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import FoodContext from '../context/FoodContext';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';
import DrinksContext from '../context/DrinksContext';
import DrinkRecomendationCard from '../components/DrinkRecomendationCard';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Copy from '../components/Clipboard-Copy';

const FoodDetails = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const actualPath = pathnameSeparate[2];
  const url = window.location.href;

  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { drinks } = useContext(DrinksContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);

  foodDetails.forEach(({ strYoutube }) => strYoutube.replace(/watch/i, 'embed/'));

  const getIngredients = () => {
    const ingredientsArr = foodDetails.map((item) => Object.entries(item)
      .filter((i) => i[0].includes('Ingredient') && i[1] !== ''));
    const ingredientsOnly = ingredientsArr.map((item) => item
      .map((i) => i.pop())).map((item) => item);
    setIngredients(ingredientsOnly);
  };

  const getMeasure = () => {
    const measuresArr = foodDetails.map((item) => Object.entries(item)
      .filter((i) => i[0].includes('Measure') && i[1] !== ' '));
    const measuresOnly = measuresArr.map((item) => item
      .map((i) => i.pop())).map((item) => item);
    setMeasures(measuresOnly);
  };

  const copy = (path) => {
    Copy(path);
    setShowMsg(true);
  };

  useEffect(() => {
    fetchMealDetailsApi(actualPath).then((data) => setFoodDetails(data.meals));
    setLoading(false);
  }, [actualPath]);

  useEffect(() => {
    getIngredients();
    getMeasure();
  }, [foodDetails]);

  return loading ? <p>Carregando...</p> : (
    <div>
      {
        foodDetails.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
        }, i) => (
          <div key={ i }>
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
              onClick={ () => copy(url) }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              key={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="favorite-icon" />
            </button>
            { showMsg ? <p>Link copiado!</p> : undefined }
            <h2 data-testid="recipe-category" key={ strCategory }>{strCategory}</h2>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient) => ingredient.map((item, index) => (
                  <li
                    key={ item }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${item} - ${measures[0][index]}`}
                  </li>
                )))
              }
            </ul>
            <p data-testid="instructions" key={ strInstructions }>{strInstructions}</p>
            <iframe
              data-testid="video"
              key={ strYoutube }
              frameBorder="0"
              title="video"
              width="200"
              height="200"
              src={ strYoutube }
            />
            <div className="recomended-wrapper">
              <div className="recomended">
                { drinks.map((drink, indice) => (
                  DrinkRecomendationCard(drink, indice)
                ))}
              </div>
            </div>
            <button
              data-testid="start-recipe-btn"
              key={ i }
              type="button"
              className="start-recipe-btn"
            >
              Iniciar receita
            </button>
          </div>))
      }
    </div>
  );
};

export default FoodDetails;
