import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FoodsInProgress() {
  const [recipeFood, setRecipeFood] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  // const { history } = useHistory();

  // localStorage.setItem('inProgressRecipes', ({ id-da-comida }));
  // inProgressRecipes: {
  //   cocktails: {},
  //   meals: { },
  // },

  useEffect(() => {
    const getRecipeFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id depois
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipeFood(meals);
    };
    getRecipeFood();
  }, []);

  useEffect(() => {
    const ingredientsList = () => {
      const keys = Object.keys(recipeFood[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = keys
        .filter((item) => recipeFood[0][item] !== ''
          && recipeFood[0][item] !== null);
      const ingredientList = ingredientNotEmpty.map((key) => recipeFood[0][key]);
      setIngredients(ingredientList);
      // console.log(recipeFood);
    };
    ingredientsList();
  }, [recipeFood]);

  // Requisito 50 - o número '52771' é só enquanto n tivermos o id
  const objInProgressRecipes = {
    meals: {
      52771: [...ingredients],
    },
  };
  console.log(objInProgressRecipes);
  localStorage.setItem('inProgressRecipes', JSON.stringify(objInProgressRecipes));

  // const handleCheked = () => (
  //   'desenvolver lógica p dar check qd é apertado a caixinha de check'
  // );

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipeFood[0];

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

      <Link to="/receitas-feitas">
        <button data-testid="finish-recipe-btn" type="button">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default FoodsInProgress;
