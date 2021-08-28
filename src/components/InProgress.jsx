import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { updateProgressRecipe, initialProgressStore } from '../helpers/setLocalStorage';

export default function InProgress(
  { name, img, category, ingredients, instructions, id, type },
) {
  const [favorite, setFavorite] = useState(false);
  const [steps, setSteps] = useState([]);
  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!localStorage.inProgressRecipes) { initialProgressStore(); }
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipes = getStorage[type];
    console.log(steps);
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
    updateProgressRecipe(id, steps, type);
    console.log(steps);
  }, [steps]);

  const handleCheckBoxChange = ({ target }) => {
    const { name: n, checked: c } = target;
    const ingIndex = steps.findIndex(({ step }) => step === n);
    console.log(ingIndex);
    console.log(steps.slice(0, ingIndex));
    setSteps([
      ...steps.slice(0, ingIndex),
      { step: n, checked: c },
      ...steps.slice(ingIndex + 1),
    ]);
  };

  const favoriteIcon = favorite ? blackHeartIcon : whiteHeartIcon;

  return (
    <div className="in-progress">
      <img width="200px" src={ img } alt={ name } data-testid="recipe-photo" />
      <div className="main-infos">
        <h1 data-testid="recipe-title">{name}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => setFavorite(!favorite) }
        >
          <img src={ favoriteIcon } alt="favorite" />
        </button>
      </div>
      <h2 data-testid="recipe-category">{category}</h2>
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
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  instructions: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired };
