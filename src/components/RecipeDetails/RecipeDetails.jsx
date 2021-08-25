import React from 'react';
import propTypes from 'prop-types';
import shareIconImg from '../../images/shareIcon.svg';
import blackHeartIconImg from '../../images/blackHeartIcon.svg';

function RecipeDetails({ recipe, type }) {
  const [details] = recipe.meals || recipe.drinks;
  const index = 0;
  let videoURL;
  if (type === 'Meal') {
    videoURL = details.strYoutube.replace('watch?v=', 'embed/');
  }
  // const maxMealIngredients = 20;
  // const maxDrinkIngredients = 15;
  // const maxIngredients = (type === 'Meal') ? maxMealIngredients : maxDrinkIngredients;

  return (
    <section>
      <img
        src={ details[`str${type}Thumb`] }
        alt="recipe"
        data-testid="recipe-photo"
        width="100px"
        height="100px"
      />
      <h2 data-testid="recipe-title">{details[`str${type}`]}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareIconImg } alt="share-button" width="50px" height="50px" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ blackHeartIconImg } alt="favorite-button" width="50px" height="50px" />
      </button>
      <h4 data-testid="recipe-category">
        {details.strCategory}
        {details.strAlcoholic}
      </h4>
      <p data-testid={ `${index}-ingredient-name-and-measure` }>ingredientes</p>
      <p data-testid="instructions">{details.strInstructions}</p>
      { videoURL && (
        <iframe
          data-testid="video"
          src={ videoURL }
          title="teste"
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen
        />
      )}
      <p data-testid={ `${index}-recomendation-card` }>recomentados</p>
      <button type="button" data-testid="start-recipe-btn" className="start-recipe">
        Iniciar Receita
      </button>
    </section>
  );
}

RecipeDetails.propTypes = {
  recipe: propTypes.shape({
    meals: propTypes.arrayOf(propTypes.shape([
      propTypes.shape({
        strCategory: propTypes.string,
      }),
    ])),
    drinks: propTypes.arrayOf(propTypes.shape([
      propTypes.shape({
        strCategory: propTypes.string,
      }),
    ])),
  }).isRequired,
  type: propTypes.string.isRequired,
};

export default RecipeDetails;
