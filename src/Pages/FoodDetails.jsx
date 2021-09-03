import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import Loading from '../Components/Loading';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';
import * as required from '../helper/requiredDetails';
import RenderRecommendations from '../Components/RenderRecommendations';
import { setMealDetails } from '../Redux/actions/actionSetRecipeDetails';

function FoodDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { push } = useHistory();

  const { consultFood,
    getDrinkRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe } = required;

  useEffect(() => {
    async function waitingForReturn() {
      setRecipe(await consultFood(id));
      setRecommendation(await getDrinkRecommendations());
      setDoneRecipe(verificationDoneRecipe(id));
      setProgressRecipe(verificatioinProgressRecipe(id));
    }
    waitingForReturn();
  }, [id, consultFood,
    getDrinkRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe]);

  const handleRedirect = () => {
    dispatch(setMealDetails(recipe));
    push(`/comidas/${id}/in-progress`);
  };

  if (recipe.length === 0) {
    return <Loading />;
  }
  return (
    <section>
      <RecipeHeader
        thumb={ recipe.strMealThumb }
        title={ recipe.strMeal }
        category={ recipe.strCategory }
        recipe={ recipe }
        type="comida"
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <ReactPlayer url={ recipe.strYoutube } controls data-testid="video" />
      </div>
      <div>
        <RenderRecommendations
          recommendation={ recommendation }
        />
      </div>
      <div>
        {!doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleRedirect }
          >
            { progressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}
      </div>
    </section>
  );
}

export default FoodDetails;
