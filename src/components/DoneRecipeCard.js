import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { clipboardCopy } from '../services';
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
  return (
    <div className="recipe-card">
      <input
        className="image-card"
        type="image"
        src={ img }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => { setIdDetails(id); setTypeDetails(type); } }
      />
      <div>
        { (type === 'bebida') ? (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </span>
        ) : (
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}`}
          </span>
        )}
        <Link to={ `${type}s/${id}` }>
          <span data-testid={ `${index}-horizontal-name` }>
            {name}
          </span>
        </Link>
        <span data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </span>
        <input
          src={ shareIcon }
          alt="Share Button"
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => clipboardCopy(type, id) }
        />
        <span id={ `share-text${id}` }>Compartilhar?</span>
        { tags.map((tag) => (
          <span
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </span>
        ))}
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
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  setIdDetails: PropTypes.func.isRequired,
  setTypeDetails: PropTypes.func.isRequired,
};
