import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataDetails } from '../services/api';

export default function useProgressRecipes() {
  const location = useLocation();
  const currentPage = location.pathname;

  const { id } = useParams();

  const [recipes, setRecipes] = useState({ id });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    recipeId: '',
    title: '',
    image: '',
    category: '',
    instructions: '',
    alcoholic: '',

  });

  useEffect(() => {
    if (currentPage.includes('bebidas')) {
      const getDrinks = async (drinkId) => {
        await getDataDetails(drinkId).then((response) => setRecipes(response));
      };
      getDrinks(id);
      setLoading(false);
    }
    const getFoods = async (foodId) => {
      await getDataDetails(foodId).then((response) => setRecipes(response));
    };
    getFoods(id);
    setLoading(false);
  }, [id, currentPage]);

  useEffect(() => {
    if (currentPage.includes('comidas')) {
      const {
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strArea,
        strTags,
      } = recipes;
      setData({
        recipeId: idMeal,
        image: strMealThumb,
        title: strMeal,
        category: strCategory,
        instructions: strInstructions,
        area: strArea,
        tags: strTags,
      });
    } else if (currentPage.includes('bebidas')) {
      const {
        idDrink,
        strDrinkThumb,
        strDrink,
        strCategory,
        strInstructions,
        strAlcoholic,
        strArea,
        strTags,
      } = recipes;
      setData({
        recipeId: idDrink,
        image: strDrinkThumb,
        title: strDrink,
        category: strCategory,
        instructions: strInstructions,
        alcoholic: strAlcoholic,
        area: strArea,
        tags: strTags,
      });
    }
  }, [currentPage, recipes]);

  return { loading, data, recipes };
}
