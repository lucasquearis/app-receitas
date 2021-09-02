import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { fetchFoodById, fetchSearchDrinksApi } from '../../services/fetchApi';
import RecommendationCard from '../../components/RecommendationCard';
import './detailsFood.css';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Video from './Video';
import StartRecipeButton from '../../components/StartRecipeButton';
import Loading from '../../components/Loading';

function DetailsFood({ match: { params: { id } } }) {
  const [state, setState] = useState({
    food: [],
    isMount: false,
    isLoading: true,
    recommendations: [],
    doneRecipe: false,
    inProgressRecipe: false,
  });

  const { food,
    isMount,
    isLoading,
    recommendations,
    doneRecipe,
    inProgressRecipe } = state;

  const initialUpdate = () => {
    const isDone = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      return doneRecipes
        ? doneRecipes.some((recipe) => (recipe.id === id && recipe.type === 'comida'))
        : false;
    };

    const inProgress = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return inProgressRecipes ? !!inProgressRecipes.meals[id] : false;
    };

    const getDrinks = async () => {
      const drinksData = await fetchSearchDrinksApi('name', '');
      const MAX_INDEX = 6;
      return drinksData.filter((_drink, index) => index < MAX_INDEX);
    };

    const getFood = async () => {
      const foodData = await fetchFoodById(id);
      const drinks = await getDrinks();
      setState({
        ...state,
        food: foodData,
        isMount: true,
        isLoading: false,
        recommendations: drinks,
        doneRecipe: isDone(),
        inProgressRecipe: inProgress(),
      });
    };

    if (!isMount) getFood();
  };

  useEffect(initialUpdate);

  if (isLoading) return <Loading />;

  const keysFoods = Object.keys(food);

  const keysIngredients = keysFoods.filter((key) => (
    key.includes('strIngredient') && !!food[key]));

  const keysMeasures = keysFoods.filter((key) => (
    key.includes('strMeasure') && !!food[key]));

  return (
    <div className="detailsFood">
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <section className="food-title-container">
        <h1 data-testid="recipe-title">{food.strMeal}</h1>
        <FavoriteAndShare
          id={ id }
          recipe={ food }
          isFood
        />
      </section>
      <p className="subtitle" data-testid="recipe-category">{food.strCategory}</p>
      <div className="container-details-ingredients">

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
      </div>
      <p className="instructions" data-testid="instructions">{food.strInstructions}</p>
      <Video
        src={ food.strYoutube }
      />
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
      <StartRecipeButton
        isFood
        doneRecipe={ doneRecipe }
        inProgress={ inProgressRecipe }
        id={ id }
      />
    </div>
  );
}

DetailsFood.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default DetailsFood;
