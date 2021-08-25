import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ComidasDetails(props) {
  const { match: { params : { id } } } = props;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorite = favoriteRecipes && favoriteRecipes.find((recipe) => recipe.idMeal === id);
  const [meal, setMeal] = useState({});
  const [isFav, setIsFav] = useState(favorite);

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch {

      }
    }
    getMeal();
  }, []);
 
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
  }
  const renderingIngredients = () => {
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= 20; index += 1) {
      if(meal[`strIngredient${index}`]){
        ingredients.push(meal[`strIngredient${index}`]);
        measures.push(meal[`strMeasure${index}`]);
      }
    }
    return { ingredients, measures };
  }

  return (
    <main>
      <div>
        <img data-testid="recipe-photo" src={meal.strMealThumb} alt="imagem do prato"/>
      </div>
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <div>
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid="share-btn"
          />
          <img
            src={ isFav ? blackHeartIcon : whiteHeartIcon }
            alt="imagem de favoritar"
            onClick={ favoritingRecipe }
            data-testid="favorite-btn"
          />
        </div>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <div>
          <ul>
            { renderingIngredients().ingredients.map((ingredient, index) => {
              const measures = renderingIngredients().measures;
              console.log(measures);
              return <li key={ ingredient }>{ ingredient } - {measures[index]} </li>;
            }
            ) }
          </ul>
        </div>
      </div>
    </main>
  );
}

export default ComidasDetails;
