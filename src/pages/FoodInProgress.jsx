import React, { useContext, useEffect, useState } from 'react';
import '../styles/RecipeInProgress.css';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import MyContext from '../context/MyContext';
import ShareButton from '../components/ShareButton';
import FavoriteButtonFoods from '../components/FavoriteButtonFoods';
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

function FoodInProgress() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState('');
  const { localStorageItems, setLocalStorageItems } = useContext(MyContext);

  useEffect(() => {
    try {
      const urlFoods = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(urlFoods);

      const fetchDetailsRecipe = async () => {
        const request = await fetch(urlFoods);
        const response = await request.json();
        const resolve = await response.meals[0];
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, setGetRecipe]);

  useEffect(() => {
    listIgredientsAndMeasure(getRecipe, setIngredient, setMeasure);
  }, [getRecipe]);

  function saveLocalStorage({ target }) {
    const { name, checked } = target;
    setCheckedOptions({
      ...checkedOptions,
      [name]: checked,
    });
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
    let tags = '';

    if (tags !== null || tags !== undefined) {
      tags = [getRecipe.strTags];
    } else {
      tags = '';
    }

    const recipes = {
      id,
      type: 'comida',
      area: getRecipe.strArea,
      category: getRecipe.strCategory,
      alcoholicOrNot: '',
      name: getRecipe.strMeal,
      image: getRecipe.strMealThumb,
      doneDate: moment().format('DD-MM-YYYY'),
      tags: [tags],
    };
    setLocalStorageItems(...localStorageItems, recipes);
    localStorage.setItem('doneRecipes', []);
    return localStorage.setItem('doneRecipes', JSON.stringify([recipes]));
  }

  return (
    <div>
      <div>
        <img
          alt="foto da bebida"
          data-testid="recipe-photo"
          src={ getRecipe.strMealThumb }
          style={ { width: '10rem' } }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ getRecipe.strMeal }</h2>
        <ShareButton />
        <FavoriteButtonFoods />
        <p data-testid="recipe-category">
          { getRecipe.strCategory }
        </p>
      </div>
      <section>
        <h4>Ingredients</h4>
        <ul>
          { ingredient.map((item, index) => (
            <li key={ index }>
              <label htmlFor={ `${index}-s` } data-testid={ `${index}-ingredient-step` }>
                <input
                  name={ `${index}` }
                  onChange={ saveLocalStorage }
                  id={ `${index}-s` }
                  type="checkbox"
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

export default FoodInProgress;
