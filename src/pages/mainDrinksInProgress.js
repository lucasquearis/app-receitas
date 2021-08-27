import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchDrinkById } from '../services/cocktailAPI';
import '../styles/mainFoodInProgress.css';
import shareImage from '../images/shareIcon.svg';
import { getFavorites, handleFavoriteAuxiliar }
  from '../auxiliar/auxiliarFunctions';

function MainDrinkInProgress({ history, match: { params: { id } } }) {
  const isFavorite = getFavorites(id);
  const [drinkInfo, setdrinkInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [disable, setDisable] = useState(true);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);

  useEffect(() => {
    fetchDrinkById(id).then(({ drinks }) => setdrinkInfo(drinks));
  }, [id]);

  useEffect(() => {
    if (ingredients.length === 0) {
      const MAX_INGREDIENT = 15;
      drinkInfo.map((item) => {
        let arr = [];
        for (let i = 1; i <= MAX_INGREDIENT; i += 1) {
          const itemIngredient = `strIngredient${i}`;
          const itemMeasure = `strMeasure${i}`;
          if (item[itemIngredient] === null || item[itemIngredient].length === 0) {
            break;
          }
          arr = [
            ...arr,
            { strMeasure: item[itemMeasure], strIngredient: item[itemIngredient] },
          ];
        }
        return setIngredients(arr);
      });
    }
  });

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
    cocktails: {
      id: [...ingredients],
    },
  };

  function lockStorage() {
    return localStorage.setItem('inProgressRecipes', JSON.stringify([objStorage]));
  }

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

  const handleFavorite = () => {
    const objSave = drinkInfo.map((item) => {
      const obj = {
        id: item.idDrink,
        type: 'bebida',
        area: '',
        category: item.strCategory,
        alcoholicOrNot: item.strAlcoholic,
        name: item.strDrink,
        image: item.strDrinkThumb,
      };
      return obj;
    })[0];
    handleFavoriteAuxiliar(objSave, setIcon, icon);
  };

  return (
    <div>
      { drinkInfo.map((drink) => {
        const allDrink = (
          <div key={ drink.idDrink }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid="recipe-photo"
              width="250px"
            />
            <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
            <h2 data-testid="recipe-category">{ drink.strCategory }</h2>
            <p>{ link }</p>
            <button type="button" data-testid="share-btn" onClick={ handleLinks }>
              <img src={ shareImage } alt="botao-compartilhar" />
            </button>
            <button type="button" onClick={ handleFavorite }>
              <img src={ icon } alt="icone-de-favoritar" data-testid="favorite-btn" />
            </button>
            <p data-testid="instructions">{ drink.strInstructions }</p>
          </div>
        );
        return allDrink;
      }) }
      <div>
        { ingredients.map(({ strMeasure, strIngredient }, i) => {
          const ingrID = `${i}-ingredient-step`;
          return (
            <label
              data-testid={ ingrID }
              key={ i }
              htmlFor={ i }
              className="a"
              onChange={ verifyChecked }
            >
              <br />
              { `${strMeasure} ${strIngredient}` }
              <input
                className="inputs-checkbox"
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
        disabled={ disable }
        onClick={ RedirectToRecipesMade }
      >
        Finalizar Receita
      </button>
      { lockStorage() }
    </div>
  );
}

MainDrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default MainDrinkInProgress;
