import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// const id = 52771;

function FoodsInProgress() {
  const [recipeFood, setRecipeFood] = useState([{}]);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const previousLocalStorage = JSON.parse(localStorage.getItem('InProgressRecipes'));
  const INITIAL_STATE = { ...previousLocalStorage, meals: { [id]: [] } };
  const [inProgress, setInProgress] = useState(INITIAL_STATE); // array de ingredientes que vão sendo checados
  const [disabled, setDisabled] = useState(true);
  // localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));

  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));
  }

  useEffect(() => {
    const getRecipeFood = async () => {
      // const { id } = useParams();
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipeFood(meals);
    };
    getRecipeFood();
  }, [id]);

  useEffect(() => {
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress({ ...LS });

    // const setLocalStorage = () => {
    //   const previousLocalStorage = JSON.parse(localStorage.getItem('InProgressRecipes'));
    //   const INITIAL_STATE = { ...previousLocalStorage, meals: { [id]: [] } };
    //   setInProgress(INITIAL_STATE);
    //   localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));
    // };
    // setLocalStorage();
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
      const keyMeasure = Object.keys(recipeFood[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipeFood[0][item] !== '' && recipeFood[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipeFood[0][kMeasure]);
      setMeasure(measureList);
    };
    ingredientsList();
  }, [recipeFood]);

  // Requisito 50
  const checkItem = (ingredient) => {
    const ingredientsArray = inProgress.meals[id];
    if (!ingredientsArray) { // lógica p qd add o primeiro ingredient
      const estado = {
        meals: {
          [id]: ingredient,
        },
      };
      setInProgress(estado);
      localStorage.setItem('inProgressRecipes', JSON.stringify(estado));
    } else {
      const alreadyExist = ingredientsArray.some((item) => item === ingredient);
      if (alreadyExist) { // lógica p qd tem q retirar
        const newIngredients = ingredientsArray.filter((item) => item !== ingredient);
        const estado2 = {
          meals: {
            [id]: newIngredients,
          },
        };
        setInProgress(estado2);
        localStorage.setItem('inProgressRecipes', JSON.stringify(estado2));
      } else { // lógica para acrescentar do 2 p frente de ingredientes.
        const estado3 = {
          meals: {
            [id]: [...inProgress.meals[id], ingredient],
          },
        };
        setInProgress(estado3);
        localStorage.setItem('inProgressRecipes', JSON.stringify(estado3));
      }
    }
  };

  const handleCheked = (ingredient) => (inProgress.meals[id].includes(ingredient));

  useEffect(() => {
    if (inProgress.meals[id].length !== ingredients.length || ingredients.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [inProgress, ingredients, id]);

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
                  defaultChecked={ handleCheked(ingredient) }
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
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabled }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default FoodsInProgress;
