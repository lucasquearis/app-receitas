import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
// import require from 'clipboard-copy';
import { fetchFoodById, fetchSearchDrinksApi } from '../../services/fetchApi';
import RecommendationCard from '../../components/RecommendationCard';
import './detailsFood.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DetailsFood({ match: { params: { id } } }) {
  const [food, setFood] = useState({});
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [copyMsg, setCopyMsg] = useState(false);
  const msg = 'Link copiado!';

  const fetchFood = () => {
    const getDrinks = async () => {
      const drinksData = await fetchSearchDrinksApi('name', '');
      const MAX_INDEX = 6;
      const MAX_NUM = 0.5;
      const MINUS_NUM = -1;
      // consultado StackOverflow Source(https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
      drinksData.sort(() => (Math.random() > MAX_NUM ? 1 : MINUS_NUM));
      setRecommendations(drinksData.filter((_drink, index) => index < MAX_INDEX));
    };

    const getFood = async () => {
      const foodData = await fetchFoodById(id);
      getDrinks();
      setFood(foodData);
      // console.log(foodData);
      setIsMount(true);
      setIsLoading(false);
    };
    if (!isMount) getFood();
  };
  useEffect(fetchFood);

  if (isLoading) return <div>Carregando...</div>;

  const keysFoods = Object.keys(food);
  const keysIngredients = keysFoods.filter((key) => (
    key.includes('strIngredient') && !!food[key]));

  // const testId = 52951; ID = testado

  const allow = `accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture`;
  const videoRegex = food.strYoutube.replace(/watch\?v=/, 'embed/');
  // console.log(videoRegex);

  // Requisito 43 - como pegar a url
  const handleClick = () => {
    const url = window.location.href;
    const copy = require('clipboard-copy');
    console.log(url);
    copy(url);
    setCopyMsg(true);
  };

  return (
    <div className="detailsFood">
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{food.strMeal}</h1>
      <section className="categ-fav-share-btn">
        <p data-testid="recipe-category">{food.strCategory}</p>
        <button
          type="button"
          data-testid="share-btn"
          className="share-btn"
          onClick={ handleClick }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        {(copyMsg) ? <p>{ msg }</p> : null }
        <button
          type="button"
          data-testid="favorite-btn"
          className="favorite-btn"
          // onClick={  }
        >
          <img src={ whiteHeartIcon } alt="favorite icon" />
        </button>
      </section>
      <ul>
        {keysIngredients.map((key, index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {food[key]}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <section>
        <iframe
          src={ videoRegex }
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
            key={ index }
            name={ drink.strDrink }
            src={ drink.strDrinkThumb }
            index={ index }
            alt={ `${drink.strDrink} image` }
          />
        ))}
      </section>
      <Link to="/bebidas/:id/in-progress">
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
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default DetailsFood;
