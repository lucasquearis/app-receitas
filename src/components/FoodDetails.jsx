import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BleckHeart from '../images/blackHeartIcon.svg';
import { fetchDrinks } from '../services/fechRecipes';

export default function FoodDetails(props) {
  const [linkPag, setLinkPag] = useState(false);
  const [buttonOnOff, setButtonOnOff] = useState({ id: '', favorite: false });
  const [drinks, setDrinks] = useState([]);
  const [clipBoardOrHeart, setClipBoardOrHeart] = useState({ copy: false,
    food: { id: '', foodFavorite: false } });

  const maxArray = 6;
  const filterDrinks = drinks.slice(0, maxArray);
  const { meal, thumb, category, instructions,
    youTube, ingredientEndMeasure, id, area, tag } = props;

  useEffect(() => {
    fetchDrinks(setDrinks);

    const localContinueFood = JSON.parse(localStorage.getItem('continueFood'));
    if (localContinueFood) {
      localContinueFood.filter((item) => item.id === id)
        .filter((item) => setButtonOnOff(item));
    }
    const localFavoriteFood = JSON.parse(localStorage.getItem('favoriteFood'));
    if (localFavoriteFood) {
      localFavoriteFood.filter((item) => item.food.id === id)
        .filter((item) => setClipBoardOrHeart(item));
    }
  }, [id]);

  const getButton = () => {
    setButtonOnOff({ id, favorite: true });
    const recipeContinue = [{ id, favorite: true }];
    const continueFood = JSON.parse(localStorage.getItem('continueFood'));

    if (continueFood !== null) {
      localStorage.setItem('continueFood', JSON
        .stringify([...continueFood, ...recipeContinue]));
    } else {
      localStorage.setItem('continueFood', JSON.stringify(recipeContinue));
    }
    setLinkPag(true);
  };

  const getContinueButton = () => (setLinkPag(true));

  const copyClipboard = () => {
    setClipBoardOrHeart({ ...clipBoardOrHeart, copy: true });
  };

  const favoriteHeart = () => {
    setClipBoardOrHeart({ ...clipBoardOrHeart, food: { id, foodFavorite: true } });
    const dataDone = clipBoardOrHeart.food.foodFavorite ? (
      'Receita Iniciada') : ('Receita Não Iniciada');
    const favorite = [{
      id,
      name: meal,
      category,
      area,
      image: thumb,
      alcoholicOrNot: 'No',
      type: '',
      dataDone,
      tag,
    }];

    const foodHeart = [{ food: { id, foodFavorite: true } }];
    localStorage.setItem('favoriteFood', JSON.stringify(foodHeart));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return (favoriteRecipes) ? (localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteRecipes, ...favorite]))) : (localStorage
      .setItem('favoriteRecipes', JSON.stringify(favorite)));
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
            clipBoardOrHeart.food.foodFavorite ? (
              <img src={ BleckHeart } alt="favorit" />
            ) : (
              <img src={ WhiteHeart } alt="No Favorit" />
            )
          }
        </button>
      </div>
      <h1 data-testid="recipe-title">{meal}</h1>
      <p data-testid="recipe-category">{category}</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientEndMeasure[0].map((item, index) => (
              <li
                key={ `${item} ${ingredientEndMeasure[1][index]}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} - ${ingredientEndMeasure[1][index]}`}
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
          buttonOnOff.favorite ? (
            <Button
              variant="success"
              type="button"
              onClick={ getContinueButton }
              data-testid="start-recipe-btn"
              link={ `comidas/${id}/in-progress` }
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
  meal: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  youTube: PropTypes.string.isRequired,
  ingredientEndMeasure: PropTypes.arrayOf(PropTypes.array).isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
