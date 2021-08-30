import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Loading from '../Components/Loading';
import getDetails from '../services/FetchDetails';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';

function FoodDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function consult() {
      const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await getDetails(END_POINT);
      setRecipe(meals[0]);
    }
    consult();
  }, [id]);

  useEffect(() => {
    async function getRecomendations() {
      const count = 0;
      const max = 6;
      const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await getDetails(END_POINT);
      const result = drinks.slice(count, max);
      setRecomendation(result);
    }
    getRecomendations();
  }, [recipe]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(isFavorite);
  };

  const handleShare = () => {
    console.log('compartilhou');
  };

  const createRecomendations = (item, index) => {
    const { idDrink, strDrink, strAlcoholic, strDrinkThumb } = item;
    return (
      <div key={ idDrink }>
        <img
          src={ strDrinkThumb }
          data-testid={ `${index}-card-img` }
          alt={ strDrink }
        />
        <div>
          <span data-testid={ `${index}-card-name` }>
            { strDrink }
          </span>
          <br />
          <span>
            { strAlcoholic }
          </span>
        </div>
      </div>
    );
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
        handleShare={ handleShare }
        handleFavorite={ handleFavorite }
        isFavorite={ isFavorite }
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
      {recomendation.map((item, index) => createRecomendations(item, index))}
      <div />
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

export default FoodDetails;
