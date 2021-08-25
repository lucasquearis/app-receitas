import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loagind';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [navegation, setNavegation] = useState('');
  const [ingredients, setIngredients] = useState({});

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
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const correctURL = pathname === 'food' ? urlFoods : urlDrinks;
        const request = await fetch(`${correctURL}${idRecipe}`);
        const response = await request.json();
        const correctReponse = pathname === 'food' ? response.meals[0]
          : response.drinks[0];
        const textNavegation = pathname === 'food' ? 'Meals' : 'Drink';
        setNavegation(textNavegation);
        setRecipe(correctReponse);
      };
      setLoading(false);
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [idRecipe]);

  if (loading) return <Loading />;

  // const video = <iframe
  //   data-testid="video"
  //   title={ recipe.srt }
  // />

  return (
    <section>
      <div>
        <img
          src={ recipe[`str${navegation}Thumb`] }
          data-testid="recipe-photo"
          alt={ recipe.strMeal }
        />
        <div>
          <h2 data-testid="recipe-title">{ recipe[`str${navegation}`] }</h2>
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
      {/* {
        pathname === 'food' ? return  :
      } */}
      <div>
        <p data-testid={ `${index}-recomendation-card` }>recomendations</p>
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
}

export default RecipeDetails;
