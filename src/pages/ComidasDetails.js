import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ComidasDetails(props) {
  const { match: { params: { id } } } = props;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorite = favoriteRecipes
    && favoriteRecipes.find((recipe) => recipe.idMeal === id);
  const [meal, setMeal] = useState({});
  const [isFav, setIsFav] = useState(favorite);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getMeal();
    const getRecomendations = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setDrinks(data.drinks);
      } catch (error) {
        console.log(error);
      }
    }
    getRecomendations();
  }, [id]);

  const favoritingRecipe = () => {
    if (isFav) {
      setIsFav(false);
      const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.idMeal !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      setIsFav(true);
      const newFavoriteRecipes = favoriteRecipes ? [...favoriteRecipes, meal] : [meal];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  const renderingIngredients = () => {
    const ingredients = [];
    const measures = [];
    const TWENTY = 20;
    for (let index = 1; index <= TWENTY; index += 1) {
      if (meal[`strIngredient${index}`]) {
        ingredients.push(meal[`strIngredient${index}`]);
        measures.push(meal[`strMeasure${index}`]);
      }
    }
    return { ingredients, measures };
  };

  const { ingredients, measures } = renderingIngredients();

  return (
    <main>
      <div>
        <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="imagem do prato" />
      </div>
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <div>
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid="share-btn"
          />
          <button
            onClick={ favoritingRecipe }
            type="button"
          >
            <img
              src={ isFav ? blackHeartIcon : whiteHeartIcon }
              alt="imagem de favoritar"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {
              ingredients
                .map((ingredient, index) => (
                  <li key={ ingredient }>
                    { `${ingredient} - ${measures[index]}`}
                  </li>))
            }
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{ meal.strInstructions }</p>
        </div>
        <div data-testid="video">
        </div>
        <div>
          <h3>Recomendadas</h3>
        </div>
        <Link data-testid="start-recipe-btn" to={`/comidas/${id}/in-progress`}>Iniciar Receita</Link>
      </div>
    </main>
  );
}

ComidasDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ComidasDetails;
