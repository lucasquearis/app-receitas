import React, { useState, useEffect } from 'react';

// 178319
function DrinksInProgress() {
  const [recipeDrink, setRecipeDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getRecipeDrink = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'; // alterar Id depois
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipeDrink(drinks);
    };
    getRecipeDrink();
  }, []);

  const { strDrink, strCategory, strInstructions, strDrinkThumb } = recipeDrink;

  useEffect(() => {
    const ingredientsList = () => {
      const keys = Object.keys(recipeDrink[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = keys
        .filter((item) => recipeDrink[0][item] !== ''
          && recipeDrink[0][item] !== null);
      const ingredientList = ingredientNotEmpty.map((key) => recipeDrink[0][key]);
      setIngredients(ingredientList);
      // console.log(recipeDrink);
    };
    ingredientsList();
  }, [recipeDrink]);

  // const handleCheked = () => (
  //   'desenvolver lógica p dar check qd é apertado a caixinha de check'
  // );

  return (
    <div className="food-in-progress">
      <p>Componente DrinksRecipeInProgress</p>

      <img data-testid="recipe-photo" alt="recipe" src={ strDrinkThumb } />
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>

      <h4 data-testid="recipe-category">{ strCategory }</h4>

      <div className="indredients">
        <h3>Ingredientes</h3>
        {
          ingredients.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ `${ingredient}` }>
                <input
                  type="checkbox"
                  id={ `${ingredient}` }
                // checked={ handleCheked() }
                />
                { `${ingredient}` }
              </label>
            </div>
          ))
        }
      </div>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <button data-testid="finish-recipe-btn" type="button">finalizar</button>
    </div>
  );
}

export default DrinksInProgress;
