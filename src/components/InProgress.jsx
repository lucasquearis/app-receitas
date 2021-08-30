import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  updateProgressRecipe,
  initialProgressStore,
  favoriteRecipes } from '../helpers/setLocalStorage';

export default function InProgress(props) {
  const {
    meal,
    drink,
    thumb,
    category,
    ingredients,
    instructions,
    id,
    type,
    alcoholic,
  } = props;
  const name = meal || drink;
  const [favorite, setFavorite] = useState(false);
  const [steps, setSteps] = useState([]);
  const [clipBoardCop, setClipBoardCop] = useState(false);
  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!localStorage.inProgressRecipes) { initialProgressStore(); }
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favorites);
      const test = favorites.some((fav) => fav.id === id);
      console.log(test);
      setFavorite(test);
    }
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipes = getStorage[type];
    if (Object.keys(recipes).some((key) => key === id)) {
      setSteps(recipes[id]);
    } else {
      const mapSteps = ingredients.map((ing) => ({
        step: ing[1],
        checked: false,
      }));
      setSteps(mapSteps);
    }
  }, []);

  useEffect(() => {
    console.log(props);
    favoriteRecipes(props, !favorite);
  }, [favorite]);

  useEffect(() => {
    updateProgressRecipe(id, steps, type, category);
  }, [steps]);

  const clipboard = () => {
    let url = window.location.href.split('/');
    url = url.splice(0, url.length - 1).join('/');
    console.log(url);
    navigator.clipboard.writeText(url);
    // const fiveSec = 5000;
    setClipBoardCop(true);
    // setTimeout(() => setClipBoardCop(false), fiveSec);
  };

  const handleCheckBoxChange = ({ target }) => {
    const { name: n, checked: c } = target;
    const ingIndex = steps.findIndex(({ step }) => step === n);
    setSteps([
      ...steps.slice(0, ingIndex),
      { step: n, checked: c },
      ...steps.slice(ingIndex + 1),
    ]);
  };

  const favoriteIcon = favorite ? blackHeartIcon : whiteHeartIcon;

  return (
    <div className="in-progress">
      <img width="200px" src={ thumb } alt={ name } data-testid="recipe-photo" />
      <div className="main-infos">
        <h1 data-testid="recipe-title">{name}</h1>
        {
          clipBoardCop && <p>Link copiado!</p>
        }
        <button
          type="button"
          onClick={ clipboard }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share" />
        </button>
        <button
          type="button"
          onClick={ () => setFavorite(!favorite) }
        >
          <img data-testid="favorite-btn" src={ favoriteIcon } alt="favorite" />
        </button>
      </div>
      {!alcoholic && <h2 data-testid="recipe-category">{category}</h2>}
      {alcoholic && <h2 data-testid="recipe-category">{alcoholic}</h2>}
      <ul>
        {steps.map(({ step, checked }, i) => (
          <li key={ i }>
            <label
              data-testid={ `${i}-ingredient-step` }
              className={ checked ? 'step-done' : '' }
              htmlFor={ `ingredient${i}` }
            >
              <input
                type="checkbox"
                checked={ checked }
                name={ step }
                id={ `ingredient${i}` }
                onChange={ handleCheckBoxChange }
              />
              {step}
            </label>
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {instructions}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !steps.every(({ checked }) => checked) }
        >
          Finish

        </button>
      </Link>
    </div>
  );
}

InProgress.propTypes = {
  meal: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
  drink: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  instructions: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired };
