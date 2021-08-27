import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BleckHeart from '../images/blackHeartIcon.svg';
import { fetchMeals } from '../services/fechRecipes';

export default function DrinksDetails(props) {
  const [linkPag, setLinkPag] = useState(false);
  const [buttonOnOff, setButtonOnOff] = useState({ id: '', favorite: false });
  const [meals, setMeals] = useState([]);
  const [clipBoardOrHeart, setClipBoardOrHeart] = useState({
    copy: false,
    drink: { id: '', drinkFavorite: false } });

  const { drink, thumb, category,
    instructions, ingredientEndMeasure, alcoholic, id } = props;
  const maxArray = 6;
  const filterMeals = meals.slice(0, maxArray);

  useEffect(() => {
    fetchMeals(setMeals);
    const localFavoriteDrink = JSON.parse(localStorage.getItem('favoriteDrink'));
    const localContinueDrink = JSON.parse(localStorage.getItem('continueDrink'));

    if (localFavoriteDrink) {
      localFavoriteDrink.filter((item) => item.drink.id === id)
        .filter((item) => setClipBoardOrHeart(item));
    }
    if (localContinueDrink) {
      localContinueDrink.filter((item) => item.id === id)
        .filter((item) => setButtonOnOff(item));
    }
  }, [id]);

  const getButton = () => {
    setButtonOnOff({ id, favorite: true });
    const recipeContinue = [{ id, favorite: true }];
    const continueDrink = JSON.parse(localStorage.getItem('continueDrink'));

    if (continueDrink !== null) {
      localStorage.setItem('continueDrink', JSON
        .stringify([...continueDrink, ...recipeContinue]));
    } else {
      localStorage.setItem('continueDrink', JSON.stringify(recipeContinue));
    }
    setLinkPag(true);
  };

  const getContinueButton = () => {
    setLinkPag(true);
  };

  const copyClipboard = () => {
    setClipBoardOrHeart({ ...clipBoardOrHeart, copy: true });
  };

  const favoriteHeart = () => {
    setClipBoardOrHeart({ ...clipBoardOrHeart, drink: { id, favorite: true } });
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const dataDone = clipBoardOrHeart.drink.drinkFavorite ? (
      'Receita Iniciada') : ('Receita Não Iniciada');
    const favoriteDrinks = [{
      id,
      name: drink,
      category,
      image: thumb,
      alcoholicOrNot: alcoholic,
      type: '',
      dataDone,
    }];
    const drinkHeart = [{ drink: { id, drinkFavorite: true } }];
    localStorage.setItem('favoriteDrink', JSON.stringify(drinkHeart));
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return (favoriteRecipes) ? (localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteRecipe, ...favoriteDrinks]))) : (
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteDrinks)));
  };
  if (linkPag) {
    return (<Redirect to={ `/bebidas/${id}/in-progress` } />);
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
          clipBoardOrHeart.copy ? (
            <p>Link copiado</p>
          ) : null
        }
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyClipboard }
        >
          <img src={ ShareIcon } alt="share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteHeart }
        >
          {
            clipBoardOrHeart.drink.drinkFavorite ? (
              <img src={ BleckHeart } alt="favorit" />
            ) : (
              <img src={ WhiteHeart } alt="No Favorit" />
            )
          }
        </button>
      </div>
      <h1 data-testid="recipe-title">{drink}</h1>
      <p data-testid="recipe-category">{`${category} (${alcoholic})`}</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientEndMeasure[0].map((item, index) => (
              <li
                key={ `${item} ${ingredientEndMeasure[1][index]}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item} - ${ingredientEndMeasure[1][index]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h2>Introdutions</h2>
        <span className="instructions" data-testid="instructions">{instructions}</span>
      </div>
      <h2>Redomendadas</h2>
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
                <h2 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h2>
              </div>
            </div>
          ))
        }
      </div>
      <div className="contentBtn">
        {
          buttonOnOff.favorite ? (
            <Button
              variant="success"
              type="button"
              onClick={ getContinueButton }
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
              link="comidas/53060"
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
  ingredientEndMeasure: PropTypes.arrayOf(PropTypes.array).isRequired,
  alcoholic: PropTypes.string.isRequired,
};
