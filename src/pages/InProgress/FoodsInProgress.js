import React, { useState, useEffect } from 'react';

function FoodsInProgress() {
  const [recipesFood, setRecipesFood] = useState([]);

  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(meals);
    };
    getRecipesFood();
  }, []);

  // const [dataRecipesFood, setDataRecipesFood] = useState([]);
  const dataRecipesFood = [...recipesFood];
  const { strMealThumb, strMeal, srtCategory, strInstructions } = dataRecipesFood;

  useEffect(() => {
    const ingredientsList = () => {
      const ingredient = Object.entries(dataRecipesFood[0])
        .filter((item) => item[0].includes('strIngredient'));
      const ingredientFilter = ingredient.filter((item) => item[1]);
      const ingredientList = Object.fromEntries(ingredientFilter);
      return (console.log(Object.values(ingredientList)));
    };
    console.log(ingredientsList());
  }, [recipesFood]);

  // const handleCheked = () => (
  //   'desenvolver lógica p dar check qd é apertado a caixinha de check'
  // );

  return (
    <div className="food-in-progress">
      {/* { ingredientsList() } */}
      <p>Componente FoodsRecipeInProgress</p>

      <img data-testid="recipe-photo" alt="recipe" src={ strMealThumb } />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>

      <h4 data-testid="recipe-category">{ srtCategory }</h4>

      <div className="indredients">
        <h3>Ingredientes</h3>

        {/* <li>
          <input data-testid={ `${index}-ingredient-step` } type="checkbox " />
          5gr de sal
        </li> */}

        {/* <div className="indredients">
          { ingredientsList.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                checked={ handleCheked() }
              />
              { `${ingredient}` }
            </div>

          ))}
        </div> */}
      </div>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <button data-testid="finish-recipe-btn" type="button">finalizar</button>
    </div>
  );
}

export default FoodsInProgress;
