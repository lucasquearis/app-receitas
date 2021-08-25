import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIconPath from '../images/shareIcon.svg';
import './css/DoneCard.css';

const DoneCard = ({ doneRecipe, index, handleClickShare }) => (
  <div className="done-recipe-container">
    <Link
      to={ `${doneRecipe.type}s/${doneRecipe.id}` }
      className="horizontal-image-link"
    >
      <img
        src={ doneRecipe.image }
        alt="Imagem da Receita"
        data-testid={ `${index}-horizontal-image` }
        className="horizontal-image"
      />
    </Link>
    <div className="done-recipe-details">
      <div className="category-share-container">
        <span
          className="done-recipe-category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          { doneRecipe.type === 'comida' ? (
            `${doneRecipe.area} - ${doneRecipe.category}`
          ) : (
            `${doneRecipe.alcoholicOrNot}`
          ) }
        </span>
        <input
          type="image"
          id={ `${doneRecipe.type}s-${doneRecipe.id} ${index}` }
          className="done-recipe-share-icon"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIconPath }
          alt="Share"
          onClick={ handleClickShare }
        />
      </div>
      <Link
        to={ `${doneRecipe.type}s/${doneRecipe.id}` }
        className="done-recipe-name-link"
      >
        <span
          className="done-recipe-name"
          data-testid={ `${index}-horizontal-name` }
        >
          { doneRecipe.name }
        </span>
      </Link>
      <span
        className="done-recipe-date"
        id={ `done-recipe-date-${index}` }
        data-testid={ `${index}-horizontal-done-date` }
      >
        { `Feita em: ${doneRecipe.doneDate}` }
      </span>
      <div className="done-recipe-tag-container">
        { (doneRecipe.type === 'comida') && (doneRecipe.tags.length > 0) ? (
          (doneRecipe.tags.slice(0, 2)).map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              className="done-recipe-tag"
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          ))
        ) : (
          <> </>
        )}
      </div>
    </div>
  </div>
);

DoneCard.propTypes = {
  doneRecipe: PropTypes.PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  handleClickShare: PropTypes.func.isRequired,
};

export default DoneCard;
