import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteButton from '../../components/RecipesInProgress/FavoriteButton';

function FoodsInProgress() {
  const [recipeFood, setRecipeFood] = useState([{}]);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [inProgress, setInProgress] = useState('');
  const [disabled, setDisabled] = useState(true);

  // useEffect p fetch
  useEffect(() => {
    const getRecipeFood = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipeFood(meals);
    };
    getRecipeFood();
  }, [id]);

  // useEffect p checar o q existe no localStorage
  useEffect(() => {
    const previousLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!previousLocalStorage) {
      const newLocalStorage = { cocktails: {}, meals: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      setInProgress(newLocalStorage);
    } else if (!previousLocalStorage.meals[id]) {
      const { meals } = previousLocalStorage;
      const newLocalStorage = { ...previousLocalStorage, meals: { ...meals, [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      setInProgress(newLocalStorage);
    } else {
      setInProgress(previousLocalStorage);
    }
  }, [id]);

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
  const handleDisabled = () => {
    if (inProgress.meals[id].length !== ingredients.length || ingredients.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (inProgress) handleDisabled();
  }, [inProgress]);

  const handleCheckItem = (ingredient) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals } = inProgressRecipes;

    if (!meals[id]) { // lógica p qd add o primeiro ingredient
      const newInProgressRecipes = {
        meals: {
          [id]: ingredient,
        },
      };
      setInProgress(newInProgressRecipes);
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
    }

    // p checar se existe o igrendiente
    const newIngredients = meals[id]
      .includes(ingredient) ? meals[id]
        .filter((item) => item !== ingredient) : [...meals[id], ingredient];

    // add ingrediente novo
    const newInProgressRecipes = {
      ...inProgressRecipes,
      meals: {
        ...meals,
        [id]: newIngredients,
      },
    };

    setInProgress(newInProgressRecipes);
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newInProgressRecipes),
    );
  };

  const handleCheked = (ingredient) => (inProgress.meals[id].includes(ingredient));

  const { strMealThumb, strMeal, strCategory, strInstructions, strArea } = recipeFood[0];

  return (
    <div className="food-in-progress">
      <p>Page FoodsRecipeInProgress</p>
      <img data-testid="recipe-photo" alt="recipe" src={ strMealThumb } />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <h4 data-testid="recipe-category">{ strCategory }</h4>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <FavoriteButton
        infos={ {
          id,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
          // doneDate,
          // tags
        } }
      />
      {/* <button data-testid="favorite-btn" type="button">btn favoritar</button> */}
      <div className="indredients">
        <h3>Ingredientes</h3>
        {
          inProgress
          && ingredients.map((ingredient, index) => (
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

export default FoodsInProgress;
