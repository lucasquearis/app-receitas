import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchFoodById } from '../services/mealAPI';
import '../styles/mainFoodInProgress.css';
import shareImage from '../images/shareIcon.svg';
import favImageWhite from '../images/whiteHeartIcon.svg';

function MainFoodsInProgress({ history, match: { params: { id } } }) {
  const [foodInfo, setFoodInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchFoodById(id).then(({ meals }) => setFoodInfo(meals));
  }, [id]);

  useEffect(() => {
    if (ingredients.length === 0) {
      const MAX_INGREDIENT = 20;
      foodInfo.map((item) => {
        let arr = [];
        for (let i = 1; i <= MAX_INGREDIENT; i += 1) {
          const itemIngredient = `strIngredient${i}`;
          const itemMeasure = `strMeasure${i}`;
          console.log(item[itemIngredient]);
          if (item[itemIngredient].length === 0) {
            setIngredients([...arr]);
            break;
          }
          arr = [
            ...arr,
            { strMeasure: item[itemMeasure], strIngredient: item[itemIngredient] },
          ];
        }
        return ingredients;
      });
    }
  }, [foodInfo, ingredients]);

  const RedirectToRecipesMade = () => {
    history.push('/receitas-feitas');
  };

  const testEvent = (event) => {
    const a = document.querySelectorAll('.a');
    a.forEach((as) => {
      if (as.textContent === event.target.value) {
        as.className = 'texto-riscado';
      }
    });
  };

  const objStorage = {
    meals: {
      id: [...ingredients],
    },
  };

  function lockStorage() {
    return localStorage.setItem('inProgressRecipes', JSON.stringify([objStorage]));
  }

  const handleShare = () => {
    setLink('Link copiado!');
    const actualLocation = window.location.href;
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = actualLocation;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <div>
      { foodInfo.map((food) => {
        const allFood = (
          <div key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid="recipe-photo"
              width="250px"
            />
            <h1 data-testid="recipe-title">{ food.strMeal }</h1>
            <h2 data-testid="recipe-category">{ food.strCategory }</h2>
            <p>{ link }</p>
            <button type="button" data-testid="share-btn" onClick={ handleShare }>
              <img src={ shareImage } alt="botao-compartilhar" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ favImageWhite } alt="icone-de-favoritar" />
            </button>
            <p data-testid="instructions">{ food.strInstructions }</p>
          </div>
        );
        return allFood;
      }) }
      <div>
        { ingredients.map(({ strMeasure, strIngredient }, i) => {
          const ingrID = `${i}-ingredient-step`;
          return (
            <label data-testid={ ingrID } key={ i } htmlFor={ i } className="a">
              <br />
              { `${strMeasure} ${strIngredient}` }
              <input
                id={ i }
                type="checkbox"
                key={ i }
                value={ `${strMeasure} ${strIngredient}` }
                onClick={ testEvent }
              />
            </label>);
        }) }
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ RedirectToRecipesMade }
      >
        Finalizar Receita
      </button>
      { lockStorage() }
    </div>
  );
}

MainFoodsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default MainFoodsInProgress;
