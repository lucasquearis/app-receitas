import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchDrinkDetails, fetchFoodRedux } from '../redux/actions/foodActions';
import { copyToClipboard, getDate, myFavoriteRecipe, startRecipe } from '../services';
import FoodsCards from './FoodsCard';

function DrinkInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, meals } = useSelector((state) => state.foodsAndDrinks);
  const [share, setShare] = useState(false);
  const [button, setButton] = useState(false);
  const [favorite, setFavorite] = useState(false);
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

  const favoriteRecipe = [{
    id,
    type: 'bebida',
    area: drinkDetails.strArea,
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strMeal,
    image: drinkDetails.strMealThumb,
  }];

  const doneRecipes = [{
    id,
    type: 'bebida',
    area: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb,
    doneDate: getDate(new Date()),
    tags: [drinkDetails.strTags],
  }];

  const favoriteHeart = <img src="/images/blackHeartIcon.svg" alt="black heart" />;
  const notFavoriteHeart = <img src="/images/whiteHeartIcon.svg" alt="white-heart" />;
  const shareTag = <img src="/images/shareIcon.svg" alt="shareIt" />;
  return (
    <section>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
      <button
        onClick={ () => setShare(copyToClipboard) }
        type="button"
        data-testid="share-btn"
      >
        { shareTag }
        <span>{ share ? 'Link copiado!' : '' }</span>
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite(myFavoriteRecipe(favoriteRecipe)) }
      >
        { favorite ? favoriteHeart : notFavoriteHeart }
      </button>
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
      <Link to={ `/bebidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          disabled={ button }
          onClick={ () => setButton(startRecipe(doneRecipes)) }
        >
          Iniciar Receita
        </button>
      </Link>
    </section>
  );
}

export default DrinkInfo;
