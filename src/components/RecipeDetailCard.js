import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecomendationCard from './RecomendationCard';
import { getMealById, getDrinkById } from '../services/apiRequisitions';

function RecipeDetail() {
  const { pathname } = useLocation();
  const { id: recipeId } = useParams();

  const recipe = {};

  if (pathname.includes('comidas')) {
    getMealById(recipeId);
  } else getDrinkById(recipeId);

  const ingredients = [{ title: 1 }, { title: 2 }, { title: 3 }];

  return (
    <section>
      <img data-testid="recipe-photo" alt="recipe" />
      <h2 data-testid="recipe-title">Recipe Title</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">Category</p>
      {ingredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient.title}
        </p>
      ))}
      <p data-testid="instructions">Instructions</p>
      { pathname.includes('comidas') ? (
        <iframe src="https://www.youtube.com/embed/XswnlG3UVQI" title="video" data-testid="video" />) : null}
      <RecomendationCard />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
}

export default RecipeDetail;
