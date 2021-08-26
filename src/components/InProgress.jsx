import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function InProgress(
  { name, img, category, ingredients, instructions, id },
) {
  const [favorite, setFavorite] = useState(false);
  const [finishedSteps, setFinishedSteps] = useState([]);
  const [checkBoxes, setcheckBoxes] = useState([]);

  useEffect(() => {
    if (localStorage.recipeProgess) {
      const { recipes } = JSON
        .parse(localStorage.getItem('recipeProgess'));
      console.log(recipes);
      const recipe = recipes.find((r) => r.id === id);
      console.log(recipe);
      if (recipe) setFinishedSteps(recipe.checked);
      localStorage.setItem('recipeProgess', JSON.stringify({
        recipes: [...recipes, { id }],
      }));
      return;
    }
    localStorage.setItem('recipeProgess', JSON.stringify({
      recipes: [{
        id,
        checked: finishedSteps,
      }],
    }));
  }, []);
  useEffect(() => {
    if (!localStorage.recipeProgess) { return; }
    const { recipes } = JSON
      .parse(localStorage.getItem('recipeProgess'));
    console.log('update');
    localStorage.setItem('recipeProgess', JSON.stringify({
      recipes: [
        ...recipes.filter(((r) => r.id !== id)),
        {
          id,
          checked: finishedSteps,
        }],
    }));
  }, [finishedSteps]);
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
        {ingredients.map((ingredient, i) => (
          <li key={ i }>
            <label
              data-testid={ `${i}-ingredient-step` }
              className={ finishedSteps.includes(i) ? 'step-done' : '' }
              htmlFor={ `ingredient${i}` }
            >
              <input
                type="checkbox"
                checked={ finishedSteps.some((step) => step === i) ? 'step-done' : '' }
                name={ ingredient[1] }
                id={ `ingredient${i}` }
                onChange={ () => {
                  if (finishedSteps.includes(i)) {
                    setFinishedSteps(finishedSteps.filter((check) => check !== i));
                    return;
                  }
                  setFinishedSteps([...finishedSteps, i]);
                  console.log(finishedSteps, 'else');
                } }
              />
              {ingredient[1]}
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
          disabled={ finishedSteps.length !== ingredients.length }
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
  ingredients: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired };
