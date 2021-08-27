import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { fetchDrinkById, fetchSearchFoodsApi } from '../../services/fetchApi';
import RecommendationCard from '../../components/RecommendationCard';
import './detailsDrink.css';

function DetailsDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const fetchDrink = () => {
    const getFood = async () => {
      const foodData = await fetchSearchFoodsApi('name', '');
      const MAX_INDEX = 6;
      const MAX_NUM = 0.5;
      const MINUS_NUM = -1;
      // consultado StackOverflow Source(https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
      foodData.sort(() => (Math.random() > MAX_NUM ? 1 : MINUS_NUM));
      setRecommendations(foodData.filter((_food, index) => index < MAX_INDEX));
    };

    const getdrink = async () => {
      const drinkData = await fetchDrinkById(id);
      getFood();
      setDrink(drinkData);
      console.log(drinkData);
      setIsMount(true);
      setIsLoading(false);
    };
    if (!isMount) getdrink();
  };

  useEffect(fetchDrink);

  if (isLoading) return <div>Carregando...</div>;

  const keysDrinks = Object.keys(drink);
  const ingredientskeys = keysDrinks.filter((key) => (
    key.includes('strIngredient') && !!drink[key]));

  // const testId = 11007; ID = testado

  return (
    <div className="detailsDrink">
      <img
        src={ drink.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <p data-testid="recipe-category">{drink.strCategory}</p>
      <p data-testid="recipe-alcoholic">{drink.strAlcoholic}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <ul>
        {ingredientskeys.map((key, index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {drink[key]}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <section className="recommendations-foods">
        {recommendations.map((food, index) => (
          <RecommendationCard
            id={ food.idMeal }
            key={ index }
            name={ food.strMeal }
            src={ food.strMealThumb }
            index={ index }
            alt={ `${food.strMeal} image` }
          />
        ))}
      </section>
      <button
        className="start-recipe-drink-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </div>
  );
}

DetailsDrink.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default DetailsDrink;
