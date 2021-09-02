import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../Components/Loading';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';
import { createRecomendationsDrink } from '../helper/renderRecomendations';
import * as required from '../helper/requiredDetails';

function FoodDetails() {
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const { id } = useParams();
  const { push } = useHistory();

  const { consultFood,
    getDrinkRecommendations,
    verificationDoneRecipe,
    verificationProgressRecipe } = required;

  useEffect(() => {
    setRecipe(consultFood(id));
    setRecomendation(getDrinkRecommendations);
    setDoneRecipe(verificationDoneRecipe(id));
    setProgressRecipe(verificationProgressRecipe(id, 'meals'));
    console.log(recipe);
  }, [id, consultFood,
    getDrinkRecommendations,
    verificationDoneRecipe,
    verificationProgressRecipe, recipe]);

  const handleRedirect = () => {
    push({ pathname: `/comidas/${id}/in-progress`,
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
      <div>
        <ReactPlayer url={ recipe.strYoutube } controls data-testid="video" />
      </div>
      <Carousel>
        {recomendation.map((item, index) => createRecomendationsDrink(item, index))}
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

export default FoodDetails;
