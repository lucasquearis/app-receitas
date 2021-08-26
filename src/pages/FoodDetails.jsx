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

  // Falta adicionar index para passar no teste

  useEffect(() => {
    const getRecipes = async (foodId) => {
      await getDataDetails(foodId).then((response) => setRecipes(response));
      setLoading(false);
    };
    getRecipes(id);
  }, [id]);

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipes;

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          key={ idMeal }
          img={ strMealThumb }
          title={ strMeal }
          category={ strCategory }
          ingredients={
            idMeal ? ingredientsDetails(recipes).map((item, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {item}
              </li>
            )) : []
          }
          instructions={ strInstructions }
          video={ strYoutube }
        />
      )}
    </div>
  );
}
