import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Spinner, FormCheck } from 'react-bootstrap';
import { getDataDetails } from '../services/api';
import ingredientsDetails from '../helpers/getIngredients';
import RecipeDetailCard from '../components/RecipeDetailCard';

export default function ProgressRecipes() {
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
      } = recipes;
      setData({
        recipeId: idMeal,
        image: strMealThumb,
        title: strMeal,
        category: strCategory,
        instructions: strInstructions,
      });
    } else if (currentPage.includes('bebidas')) {
      const {
        idDrink,
        strDrinkThumb,
        strDrink,
        strCategory,
        strInstructions,
      } = recipes;
      setData({
        recipeId: idDrink,
        image: strDrinkThumb,
        title: strDrink,
        category: strCategory,
        instructions: strInstructions,
      });
    }
  }, [currentPage, recipes]);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ data.recipeId }
          key={ data.recipeId }
          img={ data.image }
          title={ data.title }
          category={ data.alcoholic }
          ingredients={
            data.recipeId ? ingredientsDetails(recipes).map((item, index) => (
              <FormCheck
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                label={ item }
              />
            )) : []
          }
          instructions={ data.instructions }
          showRecomendations={ false }
        />
      )}
    </div>
  );
}
