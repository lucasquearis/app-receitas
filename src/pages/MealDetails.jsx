import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/Details.css';

export default function MealDetails(props) {
  const [mealDetails, setMealDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const { match: { params: { id } } } = props;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchDetails = async () => {
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setMealDetails(meals);
      setIsLoading(false);
    };
    fetchDetails();
  }, []);

  // source: https://stackoverflow.com/a/21607897, tks!
  function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const ELEVEN = 11;
    return (match && match[2].length === ELEVEN)
      ? match[2]
      : null;
  }

  function copyRecipeURL() {
    const url = document.createElement('input');
    url.value = window.location.href;
    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
    setIsCopied(true);
  }

  function renderDetails() {
    const details = mealDetails[0];
    const allKeys = (Object.keys(details));
    const ingredientKeys = allKeys.filter((key) => key.includes('strIngredient'));
    const validIngredientKeys = ingredientKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    const measuresKeys = allKeys.filter((key) => key.includes('strMeasure'));
    const validMeasuresKeys = measuresKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    return (
      <main>
        <img
          data-testid="recipe-photo"
          alt="imagem da receita"
          src={ details.strMealThumb }
        />
        <div className="title-and-btns">
          <h1 data-testid="recipe-title">{ details.strMeal }</h1>
          <div className="share-fave-btns">
            { isCopied
              ? <div className="copy-div">Link copiado! </div>
              : <div className="copy-div" /> }
            <button
              type="button"
              data-testid="share-btn"
              className="share-btn"
              onClick={ copyRecipeURL }
            >
              <img src={ shareIcon } alt="share icon" className="share-icon" />
            </button>
            <button type="button" data-testid="favorite-btn" className="fave-btn">
              <img src={ whiteHeartIcon } alt="favorite icon" />
            </button>
          </div>
        </div>
        <p data-testid="recipe-category">{ details.strCategory }</p>
        {
          validIngredientKeys.map((key, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ key }
            >
              { details[key] }
              :
              &nbsp;
              { details[validMeasuresKeys[index]] }
            </p>
          ))
        }
        <p data-testid="instructions">{ details.strInstructions }</p>
        <div data-testid="video">
          <iframe
            title="recipe title"
            width="420"
            height="315"
            src={ `https://youtube.com/embed/${getYouTubeId(details.strYoutube)}` }
          />
        </div>
        <div data-testid={ `${0}-recomendation-card` }>CARD</div>
        <button type="button" data-testid="start-recipe-btn">INICIAR RECEITA</button>
      </main>
    );
  }

  return (
    isLoading ? <p>Loading...</p> : renderDetails()
  );
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
