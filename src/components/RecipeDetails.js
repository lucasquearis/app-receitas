import React from 'react';
import PropTypes from 'prop-types';
import './css/RecipeDetails.css';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = (props) => {
  const {
    thumbnail,
    title,
    category,
    isAlcoholic,
    instructions,
    ingredients,
    measures,
    isMeal,
    videoUrl,
    recipe,
  } = props;

  return (
    <section className="recipe-container">
      <img
        className="recipe-photo"
        src={ thumbnail }
        alt={ title }
        data-testid="recipe-photo"
      />
      <div className="recipe-title-container">
        <h1 data-testid="recipe-title">{title}</h1>
        <div className="recipe-buttons-container">
          <ShareButton />
          <FavoriteButton recipe={ recipe } />
        </div>
      </div>
      <h3 data-testid="recipe-category">{category || isAlcoholic}</h3>
      <h3>Ingredients</h3>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
            -
            {measures[index]}
          </li>)) }
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{instructions}</p>
      { isMeal
        && <iframe
          className="recipe-video"
          data-testid="video"
          title={ title }
          width="420"
          height="315"
          src={ videoUrl }
        />}
    </section>);
};

RecipeDetails.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  isAlcoholic: PropTypes.string,
  instructions: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  isMeal: PropTypes.bool,
  videoUrl: PropTypes.string,
  recipe: PropTypes.shape({}),
};

RecipeDetails.defaultProps = {
  thumbnail: '',
  title: '',
  category: '',
  isAlcoholic: '',
  instructions: '',
  ingredients: [],
  measures: [],
  isMeal: false,
  videoUrl: '',
  recipe: {},
};

export default RecipeDetails;
