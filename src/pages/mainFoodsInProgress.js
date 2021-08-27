import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchFoodById } from '../services/mealAPI';
import '../styles/mainFoodInProgress.css';
import shareImage from '../images/shareIcon.svg';
import { getFavorites, handleFavoriteAuxiliar }
  from '../auxiliar/auxiliarFunctions';

function MainFoodsInProgress({ history, match: { params: { id } } }) {
  const isFavorite = getFavorites(id);
  const [foodInfo, setFoodInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);

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

  const riskCompleteds = (event) => {
    const labelCheckbox = document.querySelectorAll('.label-checkbox');
    labelCheckbox.forEach((inputs) => {
      if (inputs.textContent === event.target.value) {
        inputs.className = 'texto-riscado';
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

  const handleFavorite = () => {
    const objSave = foodInfo.map((item) => {
      const obj = {
        id: item.idMeal,
        type: 'comida',
        area: item.strArea,
        category: item.strCategory,
        alcoholicOrNot: '',
        name: item.strMeal,
        image: item.strMealThumb,
      };
      return obj;
    })[0];
    handleFavoriteAuxiliar(objSave, setIcon, icon);
  };

  const handleLinks = () => {
    setLink('Link copiado!');
    const actualLocation = window.location.href;
    const inputs = document.createElement('input');
    document.body.appendChild(inputs);
    inputs.value = actualLocation;
    inputs.select();
    document.execCommand('copy');
    document.body.removeChild(inputs);
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
            <button type="button" data-testid="share-btn" onClick={ handleLinks }>
              <img src={ shareImage } alt="botao-compartilhar" />
            </button>
            <button type="button" onClick={ handleFavorite }>
              <img src={ icon } alt="icone-de-favoritar" data-testid="favorite-btn" />
            </button>
            <p data-testid="instructions">{ food.strInstructions }</p>
          </div>
        );
        return allFood;
      }) }
      <div>
        { ingredients.map(({ strMeasure, strIngredient }, index) => {
          const ingrID = `${index}-ingredient-step`;
          return (
            <label
              data-testid={ ingrID }
              key={ index }
              htmlFor={ index }
              className="label-checkbox"
            >
              <br />
              { `${strMeasure} ${strIngredient}` }
              <input
                id={ index }
                type="checkbox"
                key={ index }
                value={ `${strMeasure} ${strIngredient}` }
                onClick={ riskCompleteds }
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
