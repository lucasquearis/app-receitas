import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../Components/Loading';
import RecipeHeader from '../Components/RecipeHeader';
import RenderRecommendations from '../Components/RenderRecommendations';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';
import * as required from '../helper/requiredDetails';

function DrinkDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);

  const { id } = useParams();
  const { push } = useHistory();

  const { consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe } = required;

  useEffect(() => {
    async function waitingForReturn() {
      setRecipe(await consultDrink(id));
      setRecommendation(await getMealsRecommendations());
      setDoneRecipe(verificationDoneRecipe(id));
      setProgressRecipe(verificatioinProgressRecipe(id));
    }
    waitingForReturn();
  }, [id, consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe]);

  if (recipe.length === 0) {
    return <Loading />;
  }
  return (
    <section>
      <RecipeHeader
        thumb={ recipe.strDrinkThumb }
        title={ recipe.strDrink }
        category={ recipe.strAlcoholic }
        recipe={ recipe }
        type="bebida"
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <RenderRecommendations
          recommendation={ recommendation }
          key
        />
      </div>
      <div>
        {!doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => push(`/bebidas/${id}/in-progress`) }
          >
            { progressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}
      </div>
    </section>
  );
}

export default DrinkDetails;
