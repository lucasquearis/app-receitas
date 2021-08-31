import React, { useEffect, useState } from 'react';
import '../styles/RecipeInProgress.css';
import { Link, useHistory } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

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
  const id = 52771;
  const indexo = 0;
  const getHistory = useHistory();
  const { location: { pathname } } = getHistory;
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState('');

  useEffect(() => {
    try {
      const urlFoods = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

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
  }, [id, getHistory, pathname, setGetRecipe]);

  useEffect(() => {
    listIgredientsAndMeasure(getRecipe, setIngredient, setMeasure);
  }, [getRecipe]);

  const foodProgress = {
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
    localStorage.setItem('inProgressRecipes', JSON.stringify([foodProgress]));
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
        <button type="button" data-testid="favorite-btn">
          <img id="favIcon" src={ whiteHeart } alt="heart" />
        </button>
        <button type="button" data-testid="share-btn">favorito</button>
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
        <span data-testid={ `${indexo}-recomendation-card` }>cards</span>
      </div>
      <div>
        <Link to="/receitas-feitas">
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
