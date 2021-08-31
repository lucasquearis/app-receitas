import { useState } from 'react';
import fetchApi from '../Helpers/fetchApi';

const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';

const SingleRecipeHook = () => {
  const [singleRecipe, setSingleRecipe] = useState('');
  const [fav, setFav] = useState(false);

  const handleRecipe = async ({ feedType, id }) => {
    if (feedType === 'comidas') {
      const meal = await fetchApi(urlMeal, 'lookup.php?i=', id);
      setSingleRecipe(meal.meals[0]);
    } else {
      const drink = await fetchApi(urlDrinks, 'lookup.php?i=', id);
      setSingleRecipe(drink.drinks[0]);
    }
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local !== null) {
      const isFav = local.some((e) => e.id === id);
      setFav(isFav);
    }
  };

  const handleFav = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb,
      idDrink, strDrink, strAlcoholic, strDrinkThumb } = singleRecipe;
    const local = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favorite = {
      id: idMeal || idDrink,
      type: idMeal ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    if (local.some((e) => e.id === idMeal || idDrink)) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, favorite]));
    }
    setFav(!fav);
  };
  return { singleRecipe, handleRecipe, handleFav, fav };
};

export default SingleRecipeHook;
