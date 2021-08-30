import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import YoutubeEmbed from '../components/YoutubeEmbed';
import RecomendationCard from '../components/RecomendationCard';
import genericFetchAPI from '../services/genericFetchAPI';

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
  const [copyOk, setCopyOk] = useState(false);
  const [ingredientName, setIngredientName] = useState([1, 2]);
  const [ingredientMeasure, setIngredientMeasure] = useState([]);
  const youtubeId = 32;

  useEffect(() => {
    const getRecipe = async () => {
      if (pathname.includes('comidas')) {
        setRecipe((await genericFetchAPI('meal', 'lookup', 'i', recipeId)).meals[0]);
      } else {
        setRecipe((await genericFetchAPI('cocktail', 'lookup', 'i', recipeId)).drinks[0]);
      }
    };
    getRecipe();
  }, [pathname, recipeId]);

  useEffect(() => {
    getIngredients(recipe, setIngredientName, setIngredientMeasure);
  }, [recipe]);

  return recipe ? (
    <section>
      <img
        data-testid="recipe-photo"
        alt="recipe"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        style={ { width: '200px', height: '150px' } }
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => { navigator.clipboard.writeText(pathname); setCopyOk(true); } }
      >
        Share
      </button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      { copyOk ? <p>Link copiado!</p> : null}
      <h4>Category:</h4>
      <p
        data-testid="recipe-category"
      >
        {recipe.strCategory === 'Cocktail' ? recipe.strAlcoholic : recipe.strCategory}
      </p>
      <h4>Instructions:</h4>
      <p
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
      <h4>Ingredients:</h4>
      { ingredientName.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient} - ${ingredientMeasure[index]}`}
        </p>
      ))}
      { pathname.includes('comidas') ? (
        <YoutubeEmbed videoId={ recipe.strYoutube.substring(youtubeId) } />) : null}
      <h4>Recomendadas</h4>
      <RecomendationCard type={ pathname.includes('comidas') ? 'drinks' : 'meals' } />
      <Link to={ `${pathname}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0',
            marginLeft: '45vw',
            marginRight: '45vw',
          } }
        >
          Iniciar Receita
        </button>
      </Link>
    </section>
  ) : <p>Loading</p>;
}

export default RecipeDetail;
