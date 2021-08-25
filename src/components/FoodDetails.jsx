import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';

export default function FoodDetails(props) {
  const { meal, thumb, category,
    instructions, youTube, ingredientEndMeasure, id } = props;

  return (
    <main>
      <img
        width="360"
        height="250"
        src={ thumb }
        alt="element"
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">
        <img src={ ShareIcon } alt="share" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ Heart } alt="favorit" />
      </button>
      <h1 data-testid="recipe-title">{meal}</h1>
      <p data-testid="recipe-category">{category}</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientEndMeasure[0].map((item, index) => (
              <li
                key={ `${item} ${ingredientEndMeasure[1][index]}` }
                data-testid={ `
                ${index}-ingredient-name-and-measure` }
              >
                <p>
                  {item}
                  -
                  {ingredientEndMeasure[1][index]}
                </p>
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h2 data-testid="instructions">Introdutions</h2>
        <span>{instructions}</span>
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
      <div>
        <h2>Redomendadas</h2>
        <div data-testid={ `${0}-recomendation-card` }>
          cards
        </div>
      </div>
      <Link to={ `/comidas/${id}/in-progress` }>
        <Button
          variant="success"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </Button>
      </Link>
    </main>
  );
}

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
  meal: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  youTube: PropTypes.string.isRequired,
  ingredientEndMeasure: PropTypes.arrayOf(PropTypes.array).isRequired,
};
