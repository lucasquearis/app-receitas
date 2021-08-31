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

  if (recipe.type === 'comida') {
    return (
      <div key={ index } className="card-done">
        <Link to={ urlDetails }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="img-card-done"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="card-done-infos">
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <div className="card-favorite-share">
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              className="icon-share"
              type="image"
              src={ share }
              alt="Compartilhar"
              onClick={ () => copyPath(urlDetails, id) }
            />
            { shareId === id
              && <span style={ { display: copyMessage } }>Link copiado!</span> }
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
    <div key={ index } className="card-done">
      <Link to={ urlDetails }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="img-card-done"
          src={ image }
          alt={ name }
        />
      </Link>
      <div className="card-done-infos">
        <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
        <Link
          data-testid={ `${index}-horizontal-name` }
          to={ `/${type}s/${id}` }
        >
          { name }
        </Link>
        <div className="card-favorite-share">
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            className="icon-share"
            type="image"
            src={ share }
            alt="Compartilhar"
            onClick={ () => copyPath(urlDetails, id) }
          />
          { shareId === id
            && <span style={ { display: copyMessage } }>Link copiado!</span> }
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
  recipe: PropTypes.objectOf(string).isRequired,
  index: PropTypes.number.isRequired,
  copyPath: PropTypes.func.isRequired,
  copyMessage: PropTypes.string.isRequired,
  shareId: PropTypes.number.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default CardFavorite;
