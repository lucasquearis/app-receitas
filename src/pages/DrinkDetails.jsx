import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import RecipeDetailCard from '../components/RecipeDetailCard';
import { getDataDetails } from '../services/api';
import ingredientsDetails from '../helpers/getIngredients';

export default function FoodDetails() {
  const { id } = useParams();

  const [recipes, setRecipes] = useState({ id });
  const [loading, setLoading] = useState(true);
  const [mealIndex, setMealIndex] = useState(0);

  // Falta adicionar index para passar no teste

  useEffect(() => {
    const getRecipes = async (drinkId) => {
      await getDataDetails(drinkId).then((response) => setRecipes(response));
      setLoading(false);
    };
    getRecipes(id);
  }, [id]);

  useEffect(() => {
    setMealIndex(((prevState) => prevState));
  }, [recipes]);

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strInstructions,
    strCategory,
    strVideo,
  } = recipes;

  console.log(ingredientsDetails(recipes));

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          key={ idDrink }
          img={ strDrinkThumb }
          index={ mealIndex }
          title={ strDrink }
          category={ strCategory }
          ingredients={
            idDrink ? ingredientsDetails(recipes).map((item) => item) : []
          }
          instructions={ strInstructions }
          video={ strVideo }
        />
      )}
    </div>
  );
}
