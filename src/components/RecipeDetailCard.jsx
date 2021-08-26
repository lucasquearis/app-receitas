import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FoodRecomendations from './FoodRecomendations';
import DrinkRecomendations from './DrinkRecomendations';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetailCard({
  img,
  title,
  category,
  ingredients,
  instructions,
  video,
  doneRecipe,
  progressRecipe,
  handleClick,
}) {
  const location = useLocation();
  const currentPage = location.pathname;

  function embedVideo(youtubeLink) {
    if (youtubeLink === null) {
      return;
    }
    return youtubeLink.replace('watch?v=', 'embed/');
  }

  return (
    <section>
      <div>
        <img
          style={ { width: '120px' } }
          data-testid="recipe-photo"
          src={ img }
          alt="Foto do produto"
        />
        <h3 data-testid="recipe-title">{title}</h3>
        <p data-testid="recipe-category">{category}</p>
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
        <img data-testid="favorite-btn" src={ favIcon } alt="Favoritar" />
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>{ingredients}</ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{instructions}</p>
      </div>
      <div>
        <h3>Video</h3>
        <iframe
          data-testid="video"
          width="340"
          height="240"
          src={ embedVideo(video) }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div />
      <div>
        {currentPage.includes('bebidas')
          ? <FoodRecomendations />
          : <DrinkRecomendations /> }
      </div>
      {!doneRecipe ? (
        <Button
          style={ { position: 'fixed', bottom: '0', width: '100%' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          {progressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </Button>

      ) : null}
    </section>
  );
}

RecipeDetailCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  progressRecipe: PropTypes.bool.isRequired,
  doneRecipe: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

RecipeDetailCard.defaultProps = {
  video: null,
};
