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
  const { location } = props;

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

  const { ingredients, measures } = renderingIngredients(meal);

  useEffect(() => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(URL)
      .then((request) => request.json())
      .then(({ meals }) => setMeal(meals[0]));
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShare(true);
  };

  if (share) {
    const threeSeconds = 3000;
    setTimeout(() => {
      setShare(false);
    }, threeSeconds);
  }

  // const inProgressRecipe = ({ target: { value } }) => {
  //   const values = [];
  //   values.push(value);

  //   const progress = {
  //     meals: [...values],
  //   };

  //   return localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  // };

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
              .map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <label htmlFor="check-ingredients">
                    { `${ingredient} - ${measures[index]}`}
                    <input
                      type="checkbox"
                      value={ index }
                      id="check-ingredients"
                      // onChange={ inProgressRecipe }
                    />
                  </label>
                </li>))
          }
        </ul>
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">Finish</button>
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
