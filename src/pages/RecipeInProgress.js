import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ShareAndFavBtn from '../components/ShareAndFaveBtn';
import genericFetchAPI from '../services/genericFetchAPI';
import './RecipeInProgress.css';

function getIngredientsAndMeasures(recipe, setIngredientsList, setMeasureList) {
  const MAX_INGREDIENTS = 15;
  const ingredients = [];
  const measures = [];
  if (recipe) {
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(recipe[`strIngredient${index}`]);
        measures.push(recipe[`strMeasure${index}`]);
      }
    }
    setIngredientsList(ingredients);
    setMeasureList(measures);
  }
}

function isRecipeFinished() {
  const tags = document.getElementsByTagName('input');
  return tags.every((tag) => tag.checked);
}

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const { pathname } = useLocation();
  const recipeInProgressSTG = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { cocktails: {}, meals: {} };

  useEffect(() => {
    const mealOrCocktail = pathname.includes('comidas') ? 'meal' : 'cocktail';
    const recipeId = pathname.split('/')[2];
    genericFetchAPI(mealOrCocktail, 'lookup', 'i', recipeId)
      .then((result) => {
        setRecipe((result.meals || result.drinks)[0]);
      });
  }, [pathname]);

  useEffect(() => {
    getIngredientsAndMeasures(recipe, setIngredientsList, setMeasureList);
  }, [recipe]);

  return recipe ? (
    <section>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        height="150px"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        width="150px"
      />
      <div>
        <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h2>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
      </div>
      <div>
        <ShareAndFavBtn recipe={ recipe } />
      </div>
      <div>
        <h3>Ingredients</h3>
        <form>
          {ingredientsList.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ `${index}-ingredient` }
              />
              <label htmlFor={ `${index}-ingredient` }>
                {`${ingredient} - ${measureList[index]}`}
              </label>
            </div>
          ))}
        </form>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      { isRecipeFinished
        ? <button data-testid="finish-recipe-btn" type="button">Finish Recipe</button>
        : null}
    </section>
  ) : <p>Loading</p>;
}

export default RecipeInProgress;
