import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../Components/Loading';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';
import { createRecomendationsFood } from '../helper/renderRecomendations';
import * as required from '../helper/requiredDetails';

function DrinkDetails() {
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const { id } = useParams();
  const { push } = useHistory();

  const { consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificationProgressRecipe } = required;

  useEffect(() => {
    setRecipe(consultDrink(id));
    setRecomendation(getMealsRecommendations);
    setDoneRecipe(verificationDoneRecipe(id));
    setProgressRecipe(verificationProgressRecipe(id, 'cocktails'));
  }, [id, consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificationProgressRecipe, recipe]);

  const handleRedirect = () => {
    push({ pathname: `/bebidas/${id}/in-progress`,
      search: '?query=abc',
      state: recipe });
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
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <Carousel>
        {recomendation.map((item, index) => createRecomendationsFood(item, index))}
      </Carousel>
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

export default DrinkDetails;
