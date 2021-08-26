import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './style.css';

const copy = require('clipboard-copy');

const InfoCard = ({ recipe, setRecipes, index }) => {
  const [shared, setShared] = useState(false);

  const {
    alcoholicOrNot,
    area,
    category,
    id,
    image,
    name,
    type,
    doneDate,
    tags,
  } = recipe;
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShared(true);
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = favorites.filter(({ id: idStorage }) => id !== idStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    setRecipes(filteredFavorites);
  };

  const renderFavoritePage = () => (
    <div className="w-100">
      <button
        type="button"
        onClick={ handleFavorite }
        className="info-card-favorite"
      >
        <img
          src={ blackHeartIcon }
          alt="Share"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );

  const renderDonePage = () => (
    <div>
      <p className="ml-3" data-testid={ `${index}-horizontal-done-date` }>
        Feita em:
        { ` ${doneDate}` }
      </p>
      <div className="w-100 d-flex justify-content-around">
        {
          tags.filter((e, i) => i <= 1)
            .map((tag) => (
              <div
                key={ `tag - ${tag}` }
                className="info-card-tag"
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </div>
            ))
        }
      </div>
    </div>
  );

  return (
    <div className="info-card my-2 d-flex">
      <img
        src={ image }
        alt={ `${name}` }
        onClick={ () => history.push(`/${type}s/${id}`) }
        aria-hidden="true"
        data-testid={ `${index}-horizontal-image` }
      />
      <div className="info-card-info w-100">
        <button
          className="share-btn-info-card"
          type="button"
          onClick={ handleShare }
        >
          <img
            src={ shareIcon }
            alt="Share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <p className="info-area-category" data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'bebida'
              ? alcoholicOrNot
              : `${area} - ${category}`
          }
        </p>
        <p
          className="info-card-name"
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/${type}s/${id}`) }
          aria-hidden="true"
        >
          { name }
        </p>
        {
          pathname.includes('favoritas')
            ? renderFavoritePage() : renderDonePage()
        }
      </div>
      { shared && <p className="info-card-copy">Link copiado!</p> }
    </div>
  );
};

InfoCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setRecipes: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default InfoCard;
