import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchFoods } from '../services/mealAPI';
import { fetchDrinkById } from '../services/cocktailAPI';
import '../styles/Details.css';
import shareImage from '../images/shareIcon.svg';
import favImageBlack from '../images/blackHeartIcon.svg';
import favImageWhite from '../images/whiteHeartIcon.svg';

function DrinkDetails({ history, match: { params: { id } } }) {
  const getFavorites = () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (allFavorites === null) {
      return favImageWhite;
    }
    const itemFound = allFavorites.find((item) => item.id === id);
    if (itemFound) {
      return favImageBlack;
    }
    return favImageWhite;
  };

  const isFavorite = getFavorites();
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recMeal, setRecMeal] = useState([]);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);

  useEffect(() => {
    fetchDrinkById(id).then(({ drinks }) => setDrinkDetails(drinks));
    fetchFoods().then(({ meals }) => setRecMeal(meals));
  }, [id]);

  useEffect(() => {
    if (ingredients.length === 0) {
      const MAX_INGREDIENT = 20;
      drinkDetails.map((item) => {
        let arr = [];
        for (let i = 1; i <= MAX_INGREDIENT; i += 1) {
          const itemIngredient = `strIngredient${i}`;
          const itemMeasure = `strMeasure${i}`;
          if (item[itemIngredient] === null) {
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
  }, [drinkDetails, ingredients]);

  const handleClick = () => {
    const { location: { pathname } } = history;
    history.push(`${pathname}/in-progress`);
  };

  const handleFavorite = () => {
    if (icon === favImageWhite) {
      setIcon(favImageBlack);
      const objSave = drinkDetails.map((item) => {
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
      const actual = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (actual !== null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...actual, objSave]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([objSave]));
      }
    } else {
      setIcon(favImageWhite);
    }
  };

  const handleButton = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!obj) {
      return (
        <button
          className="fixedbutton"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Iniciar Receita
        </button>
      );
    }
    return (
      <button
        className="fixedbutton"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        Continuar Receita
      </button>
    );
  };

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
      { drinkDetails.map((item) => {
        const all = (
          <div key={ item.idDrink }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              width="250px"
            />
            <h1 data-testid="recipe-title">{ item.strDrink }</h1>
            <input
              type="image"
              alt="share"
              src={ shareImage }
              data-testid="share-btn"
              onClick={ handleShare }
            />
            <p>{ link }</p>
            <input
              type="image"
              alt="fav"
              src={ icon }
              data-testid="favorite-btn"
              onClick={ handleFavorite }
            />
            <h2 data-testid="recipe-category">{ item.strAlcoholic }</h2>
            <div>
              { ingredients.map(({ strMeasure, strIngredient }, i) => {
                const ingrID = `${i}-ingredient-name-and-measure`;
                const allIngredients = (
                  <p data-testid={ ingrID } key={ ingrID }>
                    { `${strMeasure} ${strIngredient}` }
                  </p>
                );
                return allIngredients;
              }) }
            </div>
            <p data-testid="instructions">{ item.strInstructions }</p>
            { console.log(recMeal) }
            <div data-testid="0-recomendation-card">card</div>
            { handleButton() }
          </div>
        );
        return all;
      }) }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
