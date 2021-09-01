import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ComidasProcess(props) {
  const { match: { params: { id } } } = props;

  const {
    favoritingRecipe,
    renderingIngredients,
    verifyingRecipe,
  } = useContext(RecipesContext);

  const { favorite/* , done, inProgress */ } = verifyingRecipe(id, 'meals');

  const [meal, setMeal] = useState('');
  const inProgress = meal;
  const { strMealThumb, strMeal, strCategory, strInstructions } = inProgress;

  const [isFav, setIsFav] = useState(favorite);
  const [share, setShare] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { ingredients, measures } = renderingIngredients(meal);

  useEffect(() => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(URL)
      .then((request) => request.json())
      .then(({ meals }) => setMeal(meals[0]));
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000/comidas/${id}`);
    setShare(true);
  };

  if (share) {
    const threeSeconds = 3000;
    setTimeout(() => {
      setShare(false);
    }, threeSeconds);
  }

  const values = [];
  const inProgressRecipe = ({ target }) => {
    const takingLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = takingLocalStorage || {};

    values.push(target.id);

    const progress = {
      ...obj,
      meals: {
        ...obj.meals,
        [id]: [...values],
      },
    };

    target.parentNode.style.textDecoration = 'line-through';

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

    if (values.length === ingredients.length) setDisabled(false);
  };

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ `Foto de ${strMeal}` }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <div>
        <button
          onClick={ handleShare }
          type="button"
        >
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid="share-btn"
          />
        </button>
        { share && <p>Link copiado!</p> }
        <button
          onClick={ () => favoritingRecipe(isFav, setIsFav, id, meal) }
          type="button"
        >
          <img
            src={ isFav ? blackHeartIcon : whiteHeartIcon }
            alt="imagem de favoritar"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <p data-testid="recipe-category">{ strCategory }</p>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            ingredients
              .map((ingredient, index) => {
                const tkLocalStor = JSON.parse(localStorage.getItem('inProgressRecipes'));

                let checked = false;

                if (tkLocalStor) {
                  checked = tkLocalStor.meals[id].some((ind) => Number(ind) === index);
                }

                return (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <label htmlFor={ index }>
                      { `${ingredient} - ${measures[index]}`}
                      <input
                        type="checkbox"
                        name={ `${measures[index]}-check` }
                        id={ index }
                        checked={ checked }
                        onChange={ inProgressRecipe }
                      />
                    </label>
                  </li>);
              })
          }
        </ul>
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disabled }
        >
          Finish
        </button>
      </Link>
    </div>
  );
}

ComidasProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ComidasProcess;
