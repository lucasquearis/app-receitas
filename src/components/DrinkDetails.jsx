import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BleckHeart from '../images/blackHeartIcon.svg';
import { fetchMeals } from '../services/fechRecipes';
import { favoriteRecipes, startOrContinue } from '../helpers/setLocalStorage';

export default function DrinksDetails(props) {
  const [linkPag, setLinkPag] = useState(false);
  const [meals, setMeals] = useState([]);
  const [btnFavorite, setBtnFavorite] = useState(false);
  const [btnStart, setBtnStart] = useState(false);
  const [clipBoardCop, setClipBoardCop] = useState(false);

  const { drink, thumb, category, instructions,
    ingredientAndMeasure, alcoholic, id, type } = props;
  const maxArray = 6;
  const filterMeals = meals.slice(0, maxArray);

  useEffect(() => {
    fetchMeals(setMeals);
    startOrContinue(setBtnStart, id, type, category);
    if (localStorage.favoriteRecipes) {
      setBtnFavorite(JSON.parse(localStorage.getItem('favoriteRecipes'))
        .some((item) => item.id === id));
    }
  }, []);

  const getButton = () => {
    setLinkPag(true);
    if (!btnStart) {
      setBtnStart(true);
    }
  };
  const favorite = () => {
    favoriteRecipes(props, btnFavorite);
    if (!btnFavorite) {
      setBtnFavorite(true);
    } else {
      setBtnFavorite(false);
    }
  };

  const clipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setClipBoardCop(true);
  };

  if (linkPag) {
    return (<Redirect to={ `/bebidas/${id}/in-progress` } />);
  }
  return (
    <main className="mainDetail">
      <img
        width="100%"
        height="250"
        src={ thumb }
        alt="element"
        data-testid="recipe-photo"
      />
      <div className="divPaiTitleButton">
        <div className="nameDrinkMealsDetails">
          <h1 data-testid="recipe-title">{drink}</h1>
          <span data-testid="recipe-category">{`${category} (${alcoholic})`}</span>
        </div>
        <div className="btnShareHeart">
          {
            clipBoardCop ? (
              <p>Link copiado!</p>
            ) : null
          }
          <button
            type="button"
            onClick={ clipboard }
          >
            <img src={ ShareIcon } data-testid="share-btn" alt="share" />
          </button>
          <button
            type="button"
            onClick={ favorite }
          >
            {
              btnFavorite ? (
                <img src={ BleckHeart } data-testid="favorite-btn" alt="favorit" />
              ) : (
                <img src={ WhiteHeart } data-testid="favorite-btn" alt="No Favorit" />
              )
            }
          </button>
        </div>
      </div>
      <div className="nameDrinkMealsDetails">
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientAndMeasure[0].map((item, index) => (
              <li
                key={ `${item} ${ingredientAndMeasure[1][index]}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item} - ${ingredientAndMeasure[1][index]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div className="nameDrinkMealsDetails">
        <h2>Introdutions</h2>
        <span className="instructions" data-testid="instructions">{instructions}</span>
      </div>
      <h2 className="recomendadosMealDrinks">Redomendadas</h2>
      <div
        className="cardRecipeMeals"
      >
        {
          filterMeals.map((item, index) => (
            <div
              key={ item.strMeal }
              data-testid={ `${index}-recomendation-card` }
              className="card"
            >
              <img
                width="100%"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <div>
                <p>{item.strCategory}</p>
                <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
              </div>
            </div>
          ))
        }
      </div>
      <div className="contentBtn">
        {
          btnStart ? (
            <Button
              variant="success"
              type="button"
              onClick={ getButton }
              data-testid="start-recipe-btn"
            >
              Continuar Receita
            </Button>
          ) : (
            <Button
              data-testid="start-recipe-btn"
              variant="success"
              type="button"
              onClick={ getButton }
            >
              Iniciar Receita
            </Button>
          )
        }
      </div>
    </main>
  );
}

DrinksDetails.propTypes = {
  id: PropTypes.string.isRequired,
  drink: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  ingredientAndMeasure: PropTypes.arrayOf(PropTypes.array).isRequired,
  type: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
};
