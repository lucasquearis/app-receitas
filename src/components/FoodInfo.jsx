import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinksRedux, fetchMealDetails } from '../redux/actions/foodActions';
import DrinksCards from './DrinksCard';

function FoodInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, drinks } = useSelector((state) => state.foodsAndDrinks);
  const sixRecomendations = 6;

  useEffect(() => {
    dispatch(fetchMealDetails(id));
    dispatch(fetchDrinksRedux);
  }, [dispatch, id]);

  if (!drinks) {
    return (
      <h1>Loading</h1>
    );
  }

  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjFood = filterObjFood.filter((obj) => foodDetails[obj] !== '');
  return (
    <section>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ foodDetails.strMeal }</h2>
      <p data-testid="share-btn">Compartilhar</p>
      <p data-testid="favorite-btn">Favorito</p>
      <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
      <ul>
        { otherFilterObjFood.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { foodDetails[ingredient] }
          </li>)) }
      </ul>
      <p data-testid="instructions">{ foodDetails.strInstructions }</p>
      <iframe
        data-testid="video"
        width="360"
        height="315"
        src={ foodDetails.strYoutube }
        title={ foodDetails.strMeal }
        allowFullScreen
      />
      <ul />
      <ul>
        { drinks.slice(0, sixRecomendations)
          .map((drink, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              { DrinksCards(drink, 'bebidas', index) }
            </li>))}
      </ul>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

export default FoodInfo;
