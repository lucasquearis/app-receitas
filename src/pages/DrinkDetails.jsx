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
    const getRecipes = async (drinkId) => {
      await getDataDetails(drinkId).then((response) => setRecipes(response));
      setLoading(false);
    };
    getRecipes(id);
  }, [id]);

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
    strVideo,
  } = recipes;

  const { progress, doneRecipes } = useLocalStorageRecipes();

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          data={ recipes }
          id={ idDrink }
          key={ idDrink }
          img={ strDrinkThumb }
          title={ strDrink }
          category={ strAlcoholic }
          ingredients={
            idDrink ? ingredientsDetails(recipes).map((item, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {item}
              </li>
            )) : []
          }
          instructions={ strInstructions }
          video={ strVideo }
          doneRecipe={ doneRecipes }
          progressRecipe={ progress }
          handleClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        />
      )}
    </div>
  );
}
