import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RecipeDetailCard from '../components/RecipeDetailCard';
import { getDataDetails } from '../services/api';

export default function FoodDetails() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const ingredientMaxQtd = 20;

  useEffect(() => {
    getDataDetails(id).then((response) => setRecipes(response));
  }, [id]);

  const ingredientsAndMeasures = () => {
    for (let i = 1; i < ingredientMaxQtd; i += 1) {
      const ingredients = recipes.map((item) => item.strIngredient + i);
      console.log(ingredients);
    }
  };

  ingredientsAndMeasures();

  return (
    <div>
      {recipes.map(({
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
      }) => (
        <RecipeDetailCard
          key={ idMeal }
          img={ strMealThumb }
          title={ strMeal }
          category={ strCategory }
          instructions={ strInstructions }
          video={ strYoutube }
          recomendations={ null }
        />
      ))}
    </div>
  );
}
