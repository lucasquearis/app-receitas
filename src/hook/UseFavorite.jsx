import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import whiteHeartIconImg from '../images/whiteHeartIcon.svg';
import blackHeartIconImg from '../images/blackHeartIcon.svg';
import { addFavoriteRecipe,
  removeFavoriteRecipe } from '../redux/actions/favoriteRecipesActions';

const UseFavorite = (recipe) => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(whiteHeartIconImg);
  const favRecipes = useSelector((state) => state.favoriteRecipes);
  useEffect(() => {
    if (favRecipes.length > 0) {
      const some = favRecipes.some((e) => (e.id
        .includes(recipe.idDrink ? recipe.idDrink : recipe.idMeal)));
      if (some) {
        setHeart(blackHeartIconImg);
      } else {
        setHeart(whiteHeartIconImg);
      }
    }
  }, [recipe, favRecipes]);
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

    const some = favRecipes.some((e) => e.id === obj.id);
    if (some) {
      dispatch(removeFavoriteRecipe(obj.id));
    } else {
      dispatch(addFavoriteRecipe(obj));
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
