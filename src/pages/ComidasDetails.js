import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ComidasDetails(props) {
  const [meal, setMeal] = useState({});
  const { match: { params : { id } } } = props;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorite = favoriteRecipes && favoriteRecipes.find((recipe) => recipe.idMeal === id);
  const [isFav, setIsFav] = useState(favorite);
 
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

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setMeal(data.meals[0]);
    }
    getMeal();
  }, []);

  return (
    <main>
      <div>
        <img data-testid="recipe-photo" src={meal.strMealThumb} alt="imagem do prato"/>
      </div>
      <div>
        {meal.strMeal}
        <div>
          <img src={ shareIcon } alt="imagem de compartilhar" />
          <img
            src={ isFav ? blackHeartIcon : whiteHeartIcon }
            alt="imagem de favoritar"
            onClick={ favoritingRecipe }
          />
        </div>
      </div>
    </main>
  );
}

export default ComidasDetails;
