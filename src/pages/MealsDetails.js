import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Loading from '../components/Loagind';

function MealsDetails() {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });
  const [url, setUrl] = useState();
  const [sugestions, setSugestions] = useState([]);
  console.log(sugestions);

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
      const urlSugestions = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const fetchRecipe = async () => {
        const request = await fetch(`${urlFoods}52862`);
        const response = await request.json();
        setRecipe(response.meals[0]);
      };
      const fetchSugestions = async () => {
        const request = await fetch(`${urlSugestions}`); // colocar o id dinânmico
        const { meals } = await request.json();
        const resSugestion = meals.filter((item, key) => key < Number('6'));
        setSugestions(resSugestion);
      };
      setLoading(false);
      fetchSugestions();
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
