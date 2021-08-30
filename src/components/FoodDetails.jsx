import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BleckHeartIcon from '../images/blackHeartIcon.svg';
import { fetchDrinks } from '../services/fechRecipes';
import { favoriteRecipes, startOrContinue } from '../helpers/setLocalStorage';

export default function FoodDetails(props) {
  const [linkPag, setLinkPag] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [btnFavorite, setBtnFavorite] = useState(false);
  const [btnStart, setBtnStart] = useState(false);
  const [clipBoardCop, setClipBoardCop] = useState(false);

  const maxArray = 6;
  const filterDrinks = drinks.slice(0, maxArray);
  const { meal, thumb, category, instructions,
    youTube, ingredientAndMeasure, id, type } = props;

  useEffect(() => {
    fetchDrinks(setDrinks);
    startOrContinue(setBtnStart, id, type);
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
    return (<Redirect to={ `/comidas/${id}/in-progress` } />);
  }
  return (
    <main>
      <img
        width="100%"
        height="250"
        src={ thumb }
        alt="element"
        data-testid="recipe-photo"
      />
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
        {
          btnFavorite ? (
            <button type="button" onClick={ favorite }>
              <img src={ BleckHeartIcon } data-testid="favorite-btn" alt="favorit" />
            </button>
          ) : (
            <button type="button" onClick={ favorite }>
              <img src={ WhiteHeartIcon } data-testid="favorite-btn" alt="No Favorit" />
            </button>
          )
        }
      </div>
      <h1 data-testid="recipe-title">{meal}</h1>
      <p data-testid="recipe-category">{category}</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientAndMeasure[0].map((item, index) => (
              <li
                key={ `${item} ${ingredientAndMeasure[1][index]}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} - ${ingredientAndMeasure[1][index]}`}
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h2>Introdutions</h2>
        <span className="instructions" data-testid="instructions">{instructions}</span>
      </div>
      <div>
        <h3>Video</h3>
        <a
          data-testid="video"
          href={ youTube }
          target="blank"
        >
          Veja O Video
        </a>
      </div>
      <h2>Redomendadas</h2>
      <div
        className="cardRecipeMeals"
      >
        {
          filterDrinks.map((item, index) => (
            <div
              key={ item.strDrink }
              data-testid={ `${index}-recomendation-card` }
              className="card"
            >
              <div>
                <img
                  width="100%"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <p>{item.strCategory}</p>
                <h2 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h2>
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

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
  meal: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  youTube: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredientAndMeasure: PropTypes.arrayOf(PropTypes.array).isRequired,
};
