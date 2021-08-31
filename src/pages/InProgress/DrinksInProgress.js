import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function DrinksInProgress() {
  const [recipeDrink, setRecipeDrink] = useState([{}]);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  // const previousLocalStorage = JSON.parse(localStorage.getItem('InProgressRecipes'));
  // const INITIAL_STATE = { ...previousLocalStorage, cocktails: { [id]: [] } };
  // const INITIAL_STATE = { melas: {}, cocktails: { [id]: [] } };
  const [inProgress, setInProgress] = useState(JSON
    .parse(localStorage.getItem('inProgressRecipes')));

  const [disabled, setDisabled] = useState(true);
  // localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));

  // if (!localStorage.inProgressRecipes) {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));
  // }

  useEffect(() => {
    const getRecipeDrink = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; // alterar Id depois
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipeDrink(drinks);
    };
    getRecipeDrink();
    // console.log(recipeDrink);
  }, [id]);

  useEffect(() => {
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress({ ...LS });
  }, []);

  useEffect(() => {
    const ingredientsList = () => {
      const keys = Object.keys(recipeDrink[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = keys
        .filter((item) => recipeDrink[0][item] !== ''
          && recipeDrink[0][item] !== null);
      const ingredientList = ingredientNotEmpty.map((key) => recipeDrink[0][key]);
      setIngredients(ingredientList);
      const keyMeasure = Object.keys(recipeDrink[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipeDrink[0][item] !== '' && recipeDrink[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipeDrink[0][kMeasure]);
      setMeasure(measureList);
    };
    ingredientsList();
  }, [recipeDrink]);

  // Requisito 50
  // tentiva p ajudar no req 50
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const inProgressRecipes = { cocktails: { [id]: [] }, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  // Requisito 50
  const handleCheckItem = (ingredient) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails } = inProgressRecipes;
    // const ingredientsArray = inProgress.meals[id];

    if (!cocktails[id]) { // lógica p qd add o primeiro ingredient
      const newInProgressRecipes = {
        cocktails: {
          [id]: ingredient,
        },
      };
      setInProgress(newInProgressRecipes);
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
    }

    const newIngredients = cocktails[id]
      .includes(ingredient) ? cocktails[id]
        .filter((item) => item !== ingredient) : [...cocktails[id], ingredient];

    const newInProgressRecipes = {
      ...inProgressRecipes,
      meals: {
        ...cocktails,
        [id]: newIngredients,
      },
    };

    setInProgress(newInProgressRecipes);
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newInProgressRecipes),
    );
  };

  const handleCheked = (ingredient) => (inProgress.cocktails[id].includes(ingredient));
  // console.log(inProgress.cocktails[id]);
  // const arrayIngredients = inProgress.cocktails[id];

  // useEffect para habilitar  e desabilitar o btn 'Finalizar'
  useEffect(() => {
    if (inProgress.cocktails[id].length !== ingredients.length
      || ingredients.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [inProgress, ingredients, id]);

  const { strDrink, strCategory, strInstructions, strDrinkThumb } = recipeDrink[0];

  return (
    <div className="food-in-progress">
      <p>Page DrinksRecipeInProgress</p>
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
                  value={ `${ingredient}` }
                  onChange={ () => handleCheckItem(ingredient) }
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

export default DrinksInProgress;
