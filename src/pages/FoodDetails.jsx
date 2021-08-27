import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Sugestions from '../components/Sugestions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });
  const [url, setUrl] = useState();

  useEffect(() => {
    const filterIngredients = () => {
      const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const list = keys.map((key) => recipe[key]);
      const measureQnt = Object.keys(recipe).filter((key) => key.includes('Measure'));
      const measureList = measureQnt.map((key) => recipe[key]);
      setLists({
        ...lists,
        ingredients: list.filter((item) => item),
        measure: measureList.filter((item) => item),
      });
    };
    const correctUrl = () => {
      const ytUrl = recipe.strYoutube;
      if (ytUrl) setUrl(ytUrl.replace('watch?v=', 'embed/'));
    };
    correctUrl();
    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    try {
      setLoading(true);
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const request = await fetch(`${urlFoods}${params.id}`);
        const response = await request.json();
        setRecipe(response.meals[0]);
      };
      setLoading(false);
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) return <Loading />;

  const checkIsFavorite = () => (
    favorite ? { blackHeartIcon } : { whiteHeartIcon });

  const handleFavorite = () => setFavorite((previus) => !previus);

  return (
    <section>
      <div>
        <img
          width="250"
          height="200"
          src={ recipe.strMealThumb }
          data-testid="recipe-photo"
          alt={ recipe.strMeal }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
      </div>
      <div>
        <button data-testid="share-btn" type="button">Share</button>
        <button
          src={ checkIsFavorite }
          onClick={ handleFavorite }
          data-testid="favorite-btn"
          type="button"
        >
          { checkIsFavorite }
        </button>
      </div>
      <div>
        <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            lists.ingredients.map((item, key) => (
              <li
                key={ key }
                data-testid={ `${key}-ingredient-name-and-measure` }
              >
                { `${item} - ${lists.measure[key]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <iframe
        data-testid="video"
        title={ recipe.srtMeal }
        width="300"
        height="200"
        src={ url }
      />
      <Sugestions type="drinks" />
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

export default FoodDetails;
