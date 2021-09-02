import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavoriteRecipe } from '../redux/actions/favoriteRecipesActions';

function UseFavoriteRecipes() {
  const dispatch = useDispatch();
  const favRecipes = useSelector((state) => state.favoriteRecipes);
  const [filteredFav, setFilteredFav] = useState(favRecipes);

  useEffect(() => { setFilteredFav(favRecipes); }, [favRecipes]);

  const allFilter = () => {
    if (favRecipes) {
      setFilteredFav(favRecipes);
    }
  };

  const mealFilter = () => {
    if (favRecipes) {
      const meals = favRecipes.filter(({ type }) => type === 'comida');
      setFilteredFav(meals);
    }
  };

  const drinkFilter = () => {
    if (favRecipes) {
      const drinks = favRecipes.filter(({ type }) => type === 'bebida');
      setFilteredFav(drinks);
    }
  };

  const removeFavFromLocal = (id) => {
    dispatch(removeFavoriteRecipe(id));
  };

  return { filteredFav, allFilter, mealFilter, drinkFilter, removeFavFromLocal };
}

export default UseFavoriteRecipes;
