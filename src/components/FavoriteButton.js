import React, { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import myContext from '../context/myContext';

function FavoriteButton() {
  const { recipe } = useContext(myContext);
  const { pathname } = useLocation();
  const { id } = useParams();
  const favoriteDrink = {
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: '',
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb };

  const favoriteMeals = {
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb };

  const favorite = pathname.includes('comidas') ? favoriteMeals : favoriteDrink;
  const [heart, setHeart] = useState(whiteHeart);

  const favoriteClick = () => {
    if (localStorage.favoriteRecipes && heart === whiteHeart) {
      const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newLocalStorage = [...request, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    }
    if (localStorage.favoriteRecipes && heart === blackHeart) {
      const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterLocal = request.filter((item) => item.id !== id);
      const removeLocalStorage = [...filterLocal];
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeLocalStorage));
    }
  };

  const correctHeart = () => {
    favoriteClick();
    const img = heart === whiteHeart ? setHeart(blackHeart) : setHeart(whiteHeart);
    return img;
  };

  return (
    <input
      classeName="favorite-btn"
      data-testid="favorite-btn"
      type="image"
      src={ heart }
      alt={ heart }
      onClick={ correctHeart }
    />
  );
}

export default FavoriteButton;
