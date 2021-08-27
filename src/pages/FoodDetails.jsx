import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeDetailCard from '../components/RecipeDetailCard';
import { getDataDetails } from '../services/api';
import ingredientsDetails from '../helpers/getIngredients';
import useLocalStorageRecipes from '../hooks/useLocalStorageRecipes';

export default function FoodDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [recipes, setRecipes] = useState({ id });
  const [loading, setLoading] = useState(true);

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

  const { progress, doneRecipes } = useLocalStorageRecipes();

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ idMeal }
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
          doneRecipe={ doneRecipes }
          progressRecipe={ progress }
          handleClick={ () => history.push(`/comidas/${id}/in-progress`) }
        />
      )}
    </div>
  );
}
