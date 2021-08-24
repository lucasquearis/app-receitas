import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMealDetails } from '../redux/actions/foodActions';

function FoodInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchMealDetails(id));
  }, [dispatch, id]);
  if (!details) {
    return (
      <h1>Loading</h1>
    );
  }

  const foodDetails = details.meals[0];
  console.log(typeof foodDetails);
  const objEntriesFood = Object.values(foodDetails);
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
        <li>{objEntriesFood.filter((item) => item === 'strIngredient')}</li>
      </ul>
      {/* data-testid={ `${index}-ingredient-name-and-measure` } */}
      { console.log(Object.entries(foodDetails)) }
      <p data-testid="instructions">{ foodDetails.strInstructions }</p>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ foodDetails.strYoutube }
        title={ foodDetails.strMeal }
      />
      <section>
        {/* <p data-testid={ `${index}-recomendation-card` }>
          Card de receitas recomendadas
        </p> */}
      </section>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

export default FoodInfo;
