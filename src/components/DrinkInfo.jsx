import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinkDetails, fetchFoodRedux } from '../redux/actions/foodActions';
import FoodsCards from './FoodsCard';

function DrinkInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, meals } = useSelector((state) => state.foodsAndDrinks);
  const sixRecomendations = 6;

  useEffect(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchDrinkDetails(id));
  }, [dispatch, id]);

  if (!meals) {
    return (
      <h1>Loading</h1>
    );
  }

  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjDrink = filterObjDrink.filter((obj) => drinkDetails[obj] !== null);
  return (
    <section>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
      <p data-testid="share-btn">Compartilhar</p>
      <p data-testid="favorite-btn">Favorito</p>
      <p data-testid="recipe-category">{ drinkDetails.strCategory }</p>
      <ul>
        { otherFilterObjDrink.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { drinkDetails[ingredient] }
          </li>)) }
      </ul>
      <p data-testid="instructions">{ drinkDetails.strInstructions }</p>
      <ul />
      <ul>
        { meals.slice(0, sixRecomendations)
          .map((food, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              { FoodsCards(food, 'comidas', index) }
            </li>))}
      </ul>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

export default DrinkInfo;
