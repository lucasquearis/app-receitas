import React, { useEffect, useState } from 'react';
import '../styles/RecipeInProgress.css';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

// função para puxar os ingredientes e sua medidas
const listIgredientsAndMeasure = (getRecipe, setIngredient, setMeasure) => {
  const lenghtIndredients = 20; // quantidade máxima de ingredientes da receita
  const itens = [];
  const itensMeasure = [];
  if (getRecipe) {
    for (let i = 1; i < lenghtIndredients; i += 1) {
      itens.push(getRecipe[`strIngredient${i}`]);
      itensMeasure.push(getRecipe[`strMeasure${i}`]);
    }
  }
  setIngredient(itens.filter((it) => it !== null && it !== undefined && it.length >= 1));
  setMeasure(itensMeasure);
};

function DrinkInProgess() {
  const getHistory = useHistory();
  const { location: { pathname } } = getHistory;
  const id = pathname.replace(/([^\d])+/gim, '');
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState('');

  useEffect(() => {
    try {
      const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchDetailsRecipe = async () => {
        const request = await fetch(urlDrinks);
        const response = await request.json();
        const resolve = await response.drinks[0];
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, getHistory, pathname, setGetRecipe]);

  useEffect(() => {
    listIgredientsAndMeasure(getRecipe, setIngredient, setMeasure);
  }, [getRecipe]);

  const drinkProgress = {
    meals: {
      [id]: [...ingredient],
    },
  };

  function saveLocalStorage({ target }) {
    const { name, checked } = target;
    setCheckedOptions({
      ...checkedOptions,
      [name]: checked,
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify([drinkProgress]));
  }

  useEffect(() => {
    function checkButton() {
      const check = Object.keys(checkedOptions);
      const input = document.querySelectorAll('input');
      if (check.length > 0 && check.length === input.length) {
        const button = document.getElementById('finish-recipe');
        return button.removeAttribute('disabled');
      }
    }
    checkButton();
  }, [checkedOptions]);

  function doneRecipe() {
    // const checkedInputs = document.querySelectorAll('input');
    let tags = '';

    if (tags !== null || tags !== undefined) {
      tags = [getRecipe.strTags];
    } else {
      tags = '';
    }

    const { strAlcoholic } = getRecipe;

    let alcoholicOrNot;

    if (strAlcoholic !== null || strAlcoholic !== undefined) {
      alcoholicOrNot = strAlcoholic;
    } else {
      alcoholicOrNot = '';
    }

    const recipes = {
      id,
      type: 'bebidas',
      area: '',
      category: getRecipe.strCategory,
      alcoholicOrNot,
      name: getRecipe.strDrink,
      image: getRecipe.strMealThumb,
      doneDate: moment().format('DD-MM-YYYY'),
      tags: [tags],
    };

    function setLocalStorage(recipe) {
      const locStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      locStorage.push(recipe);
      localStorage.setItem('doneRecipes', JSON.stringify(locStorage));
    }
    return setLocalStorage(recipes);
  }
  return (
    <div>
      <div>
        <img
          alt="foto da bebida"
          data-testid="recipe-photo"
          src={ getRecipe.strDrinkThumb }
          style={ { width: '10rem' } }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ getRecipe.strDrink }</h2>
        <ShareButton />
        <FavoriteButton />
        <p data-testid="recipe-category">
          { getRecipe
            .strCategory === 'Cocktail' ? getRecipe.strAlcoholic : getRecipe.strCategory }
        </p>
      </div>
      <section>
        <h4>Ingredients</h4>
        <ul>
          { ingredient.map((item, index) => (
            <li key={ index } onChange="">
              <label htmlFor={ `${index}-s` } data-testid={ `${index}-ingredient-step` }>
                <input
                  name={ `${index}` }
                  id={ `${index}-s` }
                  type="checkbox"
                  onChange={ saveLocalStorage }
                />
                <span className="marked-checkbox">{ `${measure[index]} - ${item}` }</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h5>Preparation</h5>
        <p data-testid="instructions">{ getRecipe.strInstructions }</p>
      </section>
      <div>
        {/* <span data-testid={ `${indexo}-recomendation-card` }>cards</span> */}
      </div>
      <div>
        <Link to="/receitas-feitas" onClick={ doneRecipe }>
          <button
            id="finish-recipe"
            className="button-details"
            type="button"
            data-testid="finish-recipe-btn"
            disabled="true"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DrinkInProgess;
