import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinkDetails } from '../redux/actions/foodActions';

function DrinkInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinkDetails(id));
  }, [dispatch, id]);

  if (!details) {
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
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

export default DrinkInfo;
