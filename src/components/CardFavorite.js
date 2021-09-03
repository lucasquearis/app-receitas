import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavorite(props) {
  const { recipe, index, copyPath, copyMessage, shareId, deleteFavorite } = props;
  const { id, type, name, image, area, category,
    alcoholicOrNot } = recipe;
  const urlDetails = `/${type}s/${id}`;

  if (type === 'comida') {
    return (
      <div key={ index } className="card-made-favorite">
        <Link to={ urlDetails }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="img-card"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="card-infos">
          <span
            data-testid={ `${index}-horizontal-top-text` }
            className="card-category"
          >
            { `${area} - ${category}` }
          </span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            className="recipe-name"
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <div className="card-favorite-share">
            { shareId === id
                && <span style={ { display: copyMessage } }>Link copiado!</span> }
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              type="image"
              src={ share }
              alt="Compartilhar"
              onClick={ () => copyPath(urlDetails, id) }
            />
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => deleteFavorite(id) }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={ index } className="card-made-favorite">
      <Link to={ urlDetails }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="img-card"
          src={ image }
          alt={ name }
        />
      </Link>
      <div className="card-infos">
        <span
          data-testid={ `${index}-horizontal-top-text` }
          className="card-category"
        >
          { alcoholicOrNot }
        </span>
        <Link
          data-testid={ `${index}-horizontal-name` }
          className="recipe-name"
          to={ `/${type}s/${id}` }
        >
          { name }
        </Link>
        <div className="card-favorite-share">
          { shareId === id
              && <span style={ { display: copyMessage } }>Link copiado!</span> }
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            className="icon-share"
            type="image"
            src={ share }
            alt="Compartilhar"
            onClick={ () => copyPath(urlDetails, id) }
          />
          <input
            data-testid={ `${index}-horizontal-favorite-btn` }
            className="icon-favorite"
            type="image"
            src={ blackHeartIcon }
            alt="Favorite"
            onClick={ () => deleteFavorite(id) }
          />
        </div>
      </div>
    </div>
  );
}

CardFavorite.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  copyPath: PropTypes.func.isRequired,
  copyMessage: PropTypes.string.isRequired,
  shareId: PropTypes.number.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default CardFavorite;
