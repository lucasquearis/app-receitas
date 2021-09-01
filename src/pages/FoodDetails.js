import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import FoodContext from '../context/FoodContext';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';
import DrinksContext from '../context/DrinksContext';
import DrinkRecomendationCard from '../components/DrinkRecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getIngredients from '../util/getIngredients';
import getMeasure from '../util/getMeasures';
import getFavorite from '../util/getFavorite';
import onFavoriteFood from '../util/onFavoriteFood';
import Copy from '../components/Clipboard-Copy';
import './details.css';

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
  const [favorite, setFavorite] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const RECOMENDATION_CARDS = 6;

  foodDetails.forEach(({ strYoutube }) => strYoutube.replace(/watch/i, 'embed/'));

  const copy = (path) => {
    Copy(path);
    setShowMsg(true);
  };

  useEffect(() => {
    fetchMealDetailsApi(actualPath).then((data) => setFoodDetails(data.meals));
  }, [actualPath, setFoodDetails]);

  useEffect(() => {
    getFavorite(foodDetails, setFavorite);
    getIngredients(foodDetails, setIngredients);
    getMeasure(foodDetails, setMeasures);
  }, [foodDetails]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      {
        foodDetails && foodDetails.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
          idMeal,
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
              onClick={ () => copy(url) }
            >
              <img
                src={ shareIcon }
                alt="share-icon"
                className="detail-img-btn"
              />
            </button>
            <button
              type="button"
              onClick={ () => onFavoriteFood(foodDetails, setFavorite, favorite) }
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
            <Carousel
              responsive={ responsive }
              swipeable={ false }
              draggable={ false }
              showDots
              ssr
            >
              { drinks.slice(0, RECOMENDATION_CARDS).map((drink, index) => (
                <DrinkRecomendationCard key={ index } drink={ drink } index={ index } />
              ))}
            </Carousel>
            <Link to={ `/comidas/${idMeal}/in-progress` }>
              <button
                data-testid="start-recipe-btn"
                key={ i }
                type="button"
                className="start-recipe-btn"
              >
                Iniciar receita
              </button>
            </Link>
          </div>))
      }
    </div>
  );
};

export default FoodDetails;
