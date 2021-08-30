import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchFoodById, fetchSearchDrinksApi } from '../../services/fetchApi';
import RecommendationCard from '../../components/RecommendationCard';
import './detailsFood.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DetailsFood({ match: { url, params: { id } } }) {
  const [food, setFood] = useState({});
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [copyMsg, setCopyMsg] = useState(false);

  const fetchFood = () => {
    const getDrinks = async () => {
      const drinksData = await fetchSearchDrinksApi('name', '');
      const MAX_INDEX = 6;
      // const MAX_NUM = 0.5;
      // const MINUS_NUM = -1;
      // // consultado StackOverflow Source(https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
      // drinksData.sort(() => (Math.random() > MAX_NUM ? 1 : MINUS_NUM));
      setRecommendations(drinksData.filter((_drink, index) => index < MAX_INDEX));
    };

    const getFood = async () => {
      const foodData = await fetchFoodById(id);
      getDrinks();
      setFood(foodData);
      setIsMount(true);
      setIsLoading(false);
    };
    if (!isMount) getFood();
  };

  useEffect(fetchFood);

  const handleShare = () => {
    copy(url);
    setCopyMsg(true);
  };

  if (isLoading) return <div>Carregando...</div>;

  const keysFoods = Object.keys(food);

  const keysIngredients = keysFoods.filter((key) => (
    key.includes('strIngredient') && !!food[key]));

  const keysMeasures = keysFoods.filter((key) => (
    key.includes('strMeasure') && !!food[key]));

  // const testId = 52951; ID = testado

  const allow = `accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture`;
  const videoReplace = food.strYoutube
    ? food.strYoutube.replace(/watch\?v=/, 'embed/') : '';
  // console.log(videoRegex);

  const COPY_MSG = 'Link copiado!';

  return (
    <div className="detailsFood">
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <section className="food-title-container">
        <h1 data-testid="recipe-title">{food.strMeal}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            className="share-btn"
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            className="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="favorite icon" />
          </button>
          {(copyMsg) ? <p>{ COPY_MSG }</p> : ''}
        </div>
      </section>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <ul className="food-ingredients">
        {keysIngredients.map((key, index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${food[key]} - ${food[keysMeasures[index]]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <section>
        <iframe
          src={ videoReplace }
          title="YouTube video player"
          frameBorder="0"
          allow={ allow }
          allowFullScreen
          data-testid="video"
        />
      </section>
      <section className="recommendations-drinks">
        {recommendations.map((drink, index) => (
          <RecommendationCard
            foodPage
            id={ drink.idDrink }
            key={ drink.strDrink + index }
            name={ drink.strDrink }
            src={ drink.strDrinkThumb }
            index={ index }
            alt={ `${drink.strDrink} image` }
          />
        ))}
      </section>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          className="start-recipe-food-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

DetailsFood.propTypes = {
  match: shape({
    url: string,
    params: shape({ id: string }) }).isRequired,
};

export default DetailsFood;
