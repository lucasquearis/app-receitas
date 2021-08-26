import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Loading from '../components/Loagind';

function MealsDetails() {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);
  const [url, setUrl] = useState();

  useEffect(() => {
    const filterIngredients = () => {
      const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const list = keys.map((key) => recipe[key]);
      setIngredients(list.filter((item) => item));
    };

    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    try {
      setLoading(true);
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const request = await fetch(`${urlFoods}52862`);
        const response = await request.json();
        setRecipe(response.meals[0]);
      };
      setLoading(false);
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const correctUrl = () => {
      const ytUrl = recipe.strYoutube;
      if (ytUrl) setUrl(ytUrl.replace('watch?v=', 'embed/'));
    };
    correctUrl();
  }, [recipe]);

  if (loading) return <Loading />;

  return (
    <section>
      <div>
        <img
          src={ recipe.strMealThumb }
          data-testid="recipe-photo"
          alt={ recipe.strMeal }
        />
        <div>
          <h2 data-testid="recipe-title">{ recipe.srtMeal }</h2>
          <button data-testid="share-btn" type="button">share</button>
          <button data-testid="favorite-btn" type="button">favorite</button>
        </div>
        <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            ingredients.map((item, key) => (
              <li
                key={ key }
                data-testid={ `${key}-ingredient-name-and-measure` }
              >
                { item }
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
        className="recipe-video"
        data-testid="video"
        title={ recipe.srtMeal }
        width="420"
        height="315"
        src={ url }
      />
      {/* <div>
        <p data-testid={ `${index}-recomendation-card` }>recomendations</p>
      </div> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
}

export default MealsDetails;
