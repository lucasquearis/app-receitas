import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Loading from '../Components/Loading';
import { getDetailsApi } from '../Redux/actions/apiActions';
import createIngredientsAndMesure from '../helper/redoRecipe';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function Details() {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.MainPageReducer.details);
  const recipe = infoDetails(meals[0]);

  useEffect(() => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    dispatch(getDetailsApi(END_POINT));

    setIngredients(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasures(createIngredientsAndMesure(recipe, 'mesure'));
  }, [recipe, dispatch, id]);

  if (ingredients.length === 0) return <Loading />;
  return (
    <section>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt=" To share"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          src={ whiteHeart }
          alt="Favorite"
        />
      </button>
      <h1>INGREDIENTES E MEDIDAS</h1>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <ReactPlayer controls scr={ recipe.srtYoutube } />
      <h1 data-testid="(index)-recomendation-card">Recomentations</h1>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

export default Details;
