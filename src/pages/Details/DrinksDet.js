import React, { useState, useEffect } from 'react';
// import Context from '../../context/Context';

function DrinksDetails() {
  const [recipesDrink, setRecipesDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const getRecipesDrink = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'; // alterar id
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipesDrink(drinks);
    };
    getRecipesDrink();
  }, []);

  useEffect(() => {
    const getIngredients = () => {
      const key = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = key
        .filter((item) => recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null);
      const ingredientsList = ingredientNotEmpty
        .map((keyDrink) => recipesDrink[0][keyDrink]);
      setIngredients(ingredientsList);

      const keyMeasure = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipesDrink[0][kMeasure]);
      setMeasure(measureList);
    };
    getIngredients();
  }, [recipesDrink]);

  return (
    <>
      { recipesDrink.map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Add aos favoritos</button>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <div>
            <h3>Ingredientes</h3>
            <ul>
              { ingredients.map((ingredient, indx) => (
                <li
                  key={ indx }
                  data-testid={ `${indx}-ingredient-name-and-measure` }
                >
                  { `${measure[indx]} ${ingredient}` }

                </li>
              )) }
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <div data-testid={ `${index}-recomendation-card` }>Receitas recomendadas</div>
          <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
        </div>
      )) }
    </>
  );
}

export default DrinksDetails;
