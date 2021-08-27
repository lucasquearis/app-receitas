import React, { useState, useEffect } from 'react';

function FoodsInProgress() {
  const [recipesFood, setRecipesFood] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id depois
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(meals);
    };
    getRecipesFood();
  }, []);

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipesFood[0];
  console.log(strCategory);

  useEffect(() => {
    const ingredientsList = () => {
      const keys = Object.keys(recipesFood[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = keys
        .filter((item) => recipesFood[0][item] !== ''
          && recipesFood[0][item] !== null);
      const ingredientList = ingredientNotEmpty.map((key) => recipesFood[0][key]);
      setIngredients(ingredientList);
      console.log(recipesFood);
    };
    ingredientsList();
  }, [recipesFood]);

  // const handleCheked = () => (
  //   'desenvolver lógica p dar check qd é apertado a caixinha de check'
  // );

  return (
    <div className="food-in-progress">
      <p>Componente FoodsRecipeInProgress</p>

      <img data-testid="recipe-photo" alt="recipe" src={ strMealThumb } />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <h4 data-testid="recipe-category">{ strCategory }</h4>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>

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

export default FoodsInProgress;
