import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteButton from '../../components/RecipesInProgress/FavoriteButton';
import ShareButton from '../../components/RecipesInProgress/ShareButton';

function DrinksInProgress() {
  const [recipeDrink, setRecipeDrink] = useState([{}]);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [inProgress, setInProgress] = useState('');
  const [disabled, setDisabled] = useState(true);

  // useEffect p fetch
  useEffect(() => {
    const getRecipeDrink = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; // alterar Id depois
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipeDrink(drinks);
    };
    getRecipeDrink();
  }, [id]);

  // useEffect p checar o q existe no localStorage
  useEffect(() => {
    const previousLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!previousLocalStorage) {
      const newLocalStorage = { cocktails: { [id]: [] }, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      setInProgress(newLocalStorage);
      // console.log(localStorage.meals[id]);
    } else if (!previousLocalStorage.cocktails[id]) {
      const { cocktails } = previousLocalStorage;
      const newLocalStorage = {
        ...previousLocalStorage, cocktails: { ...cocktails, [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      setInProgress(newLocalStorage);
    } else {
      setInProgress(previousLocalStorage);
    }
  }, [id]);

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
  const handleDisabled = () => {
    if (inProgress.cocktails[id].length !== ingredients.length
      || ingredients.length === 0) {
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
    const { cocktails } = inProgressRecipes;

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

    // p checar se existe o igrendiente
    const newIngredients = cocktails[id]
      .includes(ingredient) ? cocktails[id]
        .filter((item) => item !== ingredient) : [...cocktails[id], ingredient];

    // add ingrediente novo
    const newInProgressRecipes = {
      ...inProgressRecipes,
      cocktails: {
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

  const {
    strDrink, strCategory, strInstructions, strDrinkThumb, strArea } = recipeDrink[0];

  return (
    <div className="food-in-progress">
      <p>Page DrinksRecipeInProgress</p>
      <img data-testid="recipe-photo" alt="recipe" src={ strDrinkThumb } />
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <h4 data-testid="recipe-category">{ strCategory }</h4>

      <ShareButton url={ window.location.href } />

      <FavoriteButton
        infos={ {
          id,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strDrink,
          image: strDrinkThumb,
          // doneDate,
          // tags
        } }
      />

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

export default DrinksInProgress;
