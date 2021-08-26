import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Loading from '../components/Loagind';

function DrinksDetails() {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

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
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const request = await fetch(`${urlDrinks}17015`); // colocar o id dinânmico
        const response = await request.json();
        setRecipe(response.drinks[0]);
      };
      setLoading(false);
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
          src={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt={ recipe.strDrink }
        />
        <div>
          <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
          <button data-testid="share-btn" type="button">share</button>
          <button data-testid="favorite-btn" type="button">favorite</button>
        </div>
        <h4 data-testid="recipe-category">{ recipe.strAlcoholic }</h4>
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
      {/* <div>
        <p data-testid={ `${index}-recomendation-card` }>recomendations</p>
      </div> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
}

export default DrinksDetails;
