import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButtonFoods() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  const [getRecipe, setGetRecipe] = useState({});
  const [favorite, setfavorite] = useState(false);

  useEffect(() => {
    try {
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const fetchDetailsRecipe = async () => {
        const request = await fetch(`${urlFoods}${id}`);
        const response = await request.json();
        const resolve = await response.meals[0];
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, setGetRecipe]);

  useEffect(() => {
    const heart = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (heart) {
      const yes = heart.find((i) => i.id === id);
      if (yes) setfavorite(true);
    }
  }, [id]);

  const favorited = () => {
    setfavorite(!favorite);
    const recipes = {
      id,
      type: 'comida',
      area: getRecipe.strArea,
      category: getRecipe.strCategory,
      alcoholicOrNot: '',
      name: getRecipe.strMeal,
      image: getRecipe.strMealThumb,
    };
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipes]));
      return;
    } if (storage.some((favoriteItem) => favoriteItem.id === recipes.id)) {
      return;
    } if (!favorite) {
      storage.push(recipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    } else {
      const storaged = storage.filter((favoriteItem) => favoriteItem.id !== recipes.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(storaged));
    }
  };

  return (
    <button type="button" onClick={ favorited }>
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="botão de favorito"
      />
    </button>
  );
}

export default FavoriteButtonFoods;
