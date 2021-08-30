import { useEffect, useState } from 'react';
import whiteHeartIconImg from '../images/whiteHeartIcon.svg';
import blackHeartIconImg from '../images/blackHeartIcon.svg';

const UseFavorite = (recipe) => {
  const [heart, setHeart] = useState(whiteHeartIconImg);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(recipe);
      const some = local.some((e) => (e.id
        .includes(recipe.idDrink ? recipe.idDrink : recipe.idMeal)));
      if (some) {
        setHeart(blackHeartIconImg);
      } else {
        setHeart(whiteHeartIconImg);
      }
    }
  }, [recipe]);
  const setFavoriteToLocal = () => {
    const obj = { id: recipe.idDrink ? recipe.idDrink : recipe.idMeal,
      type: recipe.idDrink ? 'bebida' : 'comida',
      area: recipe.idMeal ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.idDrink ? recipe.strAlcoholic : '',
      name: recipe.idDrink ? recipe.strDrink : recipe.strMeal,
      image: recipe.idDrink
        ? recipe.strDrinkThumb : recipe.strMealThumb,
    };
    if (localStorage.getItem('favoriteRecipes')) {
      const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const some = local.some((e) => e.id === obj.id);
      if (some) {
        const filter = local.filter((e) => e.id !== obj.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
  };
  const changeFavorite = () => {
    if (heart === whiteHeartIconImg) {
      setHeart(blackHeartIconImg);
    } else {
      setHeart(whiteHeartIconImg);
    }
    setFavoriteToLocal();
  };

  return {
    changeFavorite,
    heart,
  };
};

export default UseFavorite;
