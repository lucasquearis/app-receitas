import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import FoodRecomendations from './FoodRecomendations';
import DrinkRecomendations from './DrinkRecomendations';
import ShareAndFavBtns from './ShareAndFavBtns';

export default function RecipeDetailCard({
  img,
  data,
  title,
  category,
  ingredients,
  instructions,
  video,
  doneRecipe,
  progressRecipe,
  handleClick,
  showRecomendations,
  finalized,
}) {
  const location = useLocation();
  const currentPage = location.pathname;

  const recomendationPage = () => {
    if (currentPage.includes('bebidas')) {
      return <FoodRecomendations />;
    }
    return <DrinkRecomendations />;
  };

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
        <ShareAndFavBtns recipes={ data } />
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
          src={ video === null ? null : video.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div />
      <div>
        {showRecomendations ? recomendationPage() : null}
      </div>
      {!doneRecipe && showRecomendations ? (
        <Button
          style={ { position: 'fixed', bottom: '0', width: '100%' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          {progressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </Button>
      ) : null}
      {!showRecomendations ? (
        <Link to="/receitas-feitas">
          <Button
            style={ { position: 'fixed', bottom: '0', width: '100%' } }
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleClick }
            disabled={ !finalized }
          >
            {progressRecipe ? 'Continuar Receita' : 'Finalizar Receita'}
          </Button>
        </Link>
      ) : null}
    </section>
  );
}

RecipeDetailCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  img: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  instructions: PropTypes.string,
  video: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.object,
  ),
  progressRecipe: PropTypes.bool,
  doneRecipe: PropTypes.bool,
  finalized: PropTypes.bool,
  showRecomendations: PropTypes.bool,
  handleClick: PropTypes.func,
};

RecipeDetailCard.defaultProps = {
  video: null,
  showRecomendations: true,
  data: {},
  img: '',
  title: '',
  category: '',
  instructions: '',
  ingredients: [{}],
  progressRecipe: false,
  doneRecipe: false,
  finalized: false,
  handleClick: () => {},
};
