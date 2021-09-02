import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { clipboardCopy } from '../utils';
import '../styles/doneRecipeCard.css';

export default function DoneRecipeCard({
  id,
  name,
  img,
  index,
  setIdDetails,
  setTypeDetails,
  type,
  alcoholicOrNot,
  area,
  category,
  doneDate,
  tags,
}) {
  const tagsArr = typeof tags === 'string' ? tags.split(',') : tags;
  return (
    <div className="done-recipe-card">
      <input
        className="done-image-card"
        type="image"
        src={ img }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => { setIdDetails(id); setTypeDetails(type); } }
      />
      <div className="done-card-info">
        <div className="aux-and-share">
          { (type === 'bebida') ? (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot}
            </span>
          ) : (
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}`}
            </span>
          )}
          <div>
            <input
              src={ shareIcon }
              alt="Share Button"
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => clipboardCopy(type, id) }
            />
            <span id={ `share-text${id}` } />
          </div>
        </div>
        <Link to={ `/${type}s/${id}` }>
          <p className="done-link" data-testid={ `${index}-horizontal-name` }>
            {name}
          </p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </p>
        <div className="done-tags">
          { tagsArr.map((tag, i) => (
            <span
              key={ `${i}-tag` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  setIdDetails: PropTypes.func.isRequired,
  setTypeDetails: PropTypes.func.isRequired,
};
