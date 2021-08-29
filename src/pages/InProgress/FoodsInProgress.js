import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FoodsInProgress() {
  const [recipeFood, setRecipeFood] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    const getRecipeFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id depois
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipeFood(meals);

      const id = 52771; // trocar depois p ser dinâmico
      const objInProgressRecipes = { cocktails: {}, meals: { [id]: [] } }; // lembrar de dar spread p captar o de antes
      // coloquei a o objInProgressRecipes  dentro do LS
      localStorage.setItem('inProgressRecipes', JSON.stringify(objInProgressRecipes));
    };
    getRecipeFood();
    // console.log(recipeFood);
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
      // console.log(ingredientList);

      const keyMeasure = Object.keys(recipeFood[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipeFood[0][item] !== '' && recipeFood[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipeFood[0][kMeasure]);
      setMeasure(measureList);
    };
    ingredientsList();
  }, [recipeFood]);

  // Requisito 50 - o número '52771' é só enquanto n tivermos o id
  // esperar o requisito 41 q vai criai o objeto inProgressRecipes com a key do id da receita.

  // const inputs = document.querySelectorAll('input');
  // const inputsArray = Array.from(inputs);
  // console.log(inputsArray);
  const checkItem = (ingredient) => {
    // const storage = localStorage.getItem('inProgressRecipes');
    // storage.filter((input) => (
    //   input.value !== ingredient ? inputsArray.push(ingredient) : ''
    // ));
    // console.log(inputsArray);
    // const newIngredient = check.filter((item) => item === ingredient);

    // console.log(newIngredient);
    check.push(ingredient);
    setCheck([
      ...check,
      ingredient,
    ]);

    // console.log(check);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ 52771: check }));
  };

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipeFood[0];

  return (
    <div className="food-in-progress">
      <p>Page FoodsRecipeInProgress</p>

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
                  value={ `${ingredient}` }
                  onChange={ () => checkItem(ingredient) }
                />
                { `${measure[index]} ${ingredient}` }
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
