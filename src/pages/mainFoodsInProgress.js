import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchFoodById } from '../services/mealAPI';
import '../styles/mainFoodInProgress.css';
import shareImage from '../images/shareIcon.svg';
import { getFavorites, handleFavoriteAuxiliar }
  from '../auxiliar/auxiliarFunctions';

function MainFoodsInProgress({ history, match: { params: { id } } }) {
  const auxiliar = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getLocalStorage) {
      return [];
    }
    if (Object.keys(getLocalStorage).includes('meals')) {
      const findItem = [getLocalStorage].find((storage) => Object
        .keys(storage.meals).includes(id));
      if (findItem) return getLocalStorage.meals[id];
      return [];
    }
    return [];
  };
  const localStorageChecked = auxiliar();
  const isFavorite = getFavorites(id);
  const [foodInfo, setFoodInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);
  const [disable, setDisable] = useState(true);
  const [checkArray, SetCheckArray] = useState(localStorageChecked);

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
    const dateNow = new Date();
    const formatDate = `${dateNow}`.split(' GMT')[0];
    const objToSave = foodInfo.map((item) => {
      let tagFormat;
      if (item.strTags) {
        tagFormat = item.strTags.split(', ');
      } else {
        tagFormat = [];
      }
      const obj = {
        id: item.idMeal,
        type: 'comida',
        area: item.strArea,
        category: item.strCategory,
        alcoholicOrNot: '',
        name: item.strMeal,
        image: item.strMealThumb,
        doneDate: formatDate,
        tags: tagFormat,
      };
      return obj;
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify(objToSave));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, ...objToSave]));
    }
    history.push('/receitas-feitas');
  };

  useEffect(() => {
    function saveInLocal() {
      if (checkArray.length) {
        let getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (!getLocal) {
          const objectStore = {};
          localStorage.setItem('inProgressRecipes', JSON.stringify(objectStore));
          getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
        }
        const objeto = {
          [id]: checkArray,
        };
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ ...getLocal, meals: { ...getLocal.meals, ...objeto } }));
      }
    }
    saveInLocal();
  }, [checkArray, id]);

  const riskCompleteds = ({ target: { value, checked } }, index) => {
    if (checked) {
      SetCheckArray([...checkArray, index]);
    }

    const labelCheckbox = document.querySelectorAll('.label-checkbox');
    labelCheckbox.forEach((inputs) => {
      if (inputs.textContent === value) {
        inputs.className = 'texto-riscado';
      }
    });
  };

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
    const actualLocation = String(window.location.href);
    const a = actualLocation.split('/');
    const actual = `${a[0]}//${a[1]}${a[2]}/${a[3]}/${a[4]}`;
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = actual;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  const verifyChecked = () => {
    const input = document.querySelectorAll('.inputs-checkbox');
    input.forEach((inputs) => {
      if (inputs.checked === true) setDisable(false);
      else setDisable(true);
    });
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
              onChange={ verifyChecked }
              data-testid={ ingrID }
              key={ index }
              htmlFor={ index }
              className="label-checkbox"
            >
              <br />
              { `${strMeasure} ${strIngredient}` }
              <input
                checked={ checkArray.includes(index) }
                className="inputs-checkbox"
                id={ index }
                type="checkbox"
                key={ index }
                value={ `${strMeasure} ${strIngredient}` }
                onClick={ (e) => riskCompleteds(e, index) }
              />
            </label>);
        }) }
      </div>
      <button
        disabled={ disable }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ RedirectToRecipesMade }
      >
        Finalizar Receita
      </button>
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
