import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecomendationCard from './RecomendationCard';
import { getMealById, getDrinkById } from '../services/apiRequisitions';

function getIngredients(recipe, setIngredientName, setIngredientMeasure) {
  const MAX_INGREDIENTS = 20;
  if (recipe) {
    const listNames = [];
    const listMeasure = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        listNames.push(recipe[`strIngredient${index}`]);
        listMeasure.push(recipe[`strMeasure${index}`]);
      }
    }
    setIngredientName(listNames);
    setIngredientMeasure(listMeasure);
  }
}

function RecipeDetail() {
  const { pathname } = useLocation();
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState();
  const [ingredientName, setIngredientName] = useState([1, 2]);
  const [ingredientMeasure, setIngredientMeasure] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      if (pathname.includes('comidas')) {
        setRecipe(await getMealById(recipeId));
      } else setRecipe(await getDrinkById(recipeId));
    };
    getRecipe();
  }, [pathname, recipeId]);

  useEffect(() => {
    getIngredients(recipe, setIngredientName, setIngredientMeasure);
  }, [recipe]);

  return recipe ? (
    <section>
      <img data-testid="recipe-photo" alt="recipe" />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p
        data-testid="recipe-category"
      >
        {recipe.strCategory === 'Cocktail' ? recipe.strAlcoholic : recipe.strCategory}
      </p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { ingredientName.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient} - ${ingredientMeasure[index]}`}
        </p>
      ))}
      { pathname.includes('comidas') ? (
        <iframe
          width="420"
          height="315"
          src={ `${(recipe.strYoutube).replace('watch?v=', 'embed/')}` }
          title="video"
          data-testid="video"
        />) : null}
      <RecomendationCard />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  ) : <p>Loading</p>;
}

export default RecipeDetail;
