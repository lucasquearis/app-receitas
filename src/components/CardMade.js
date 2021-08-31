import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';

function CardMade(props) {
  const { recipe, index, copyPath, copyMessage, shareId } = props;
  const { id, type, name, image, area, category,
    doneDate, tags, alcoholicOrNot } = recipe;
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
          <div className="card-done-share">
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
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
          </div>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          <div className="card-done-tags">
            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </div>
            ))}
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
        <div className="card-done-share">
          <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
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
        </div>
        <Link
          data-testid={ `${index}-horizontal-name` }
          to={ `/${type}s/${id}` }
        >
          { name }
        </Link>
        <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
      </div>
    </div>
  );
}

CardMade.propTypes = {
  recipe: PropTypes.objectOf(string).isRequired,
  index: PropTypes.number.isRequired,
  copyPath: PropTypes.func.isRequired,
  copyMessage: PropTypes.string.isRequired,
  shareId: PropTypes.number.isRequired,
};

export default CardMade;
