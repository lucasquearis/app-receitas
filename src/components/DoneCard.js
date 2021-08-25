import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIconPath from '../images/shareIcon.svg';
import './css/DoneCard.css';

const DoneCard = ({ type, doneRecipe, index, handleClickShare }) => (
  <div className="done-recipe-container" key={ index }>
    <Link
      to={ type === 'meal' ? (
        `comidas/${doneRecipe.idMeal}`
      ) : (
        `bebidas/${doneRecipe.idDrink}`
      ) }
    >
      <img
        src={ type === 'meal' ? (
          doneRecipe.strMealThumb
        ) : (
          doneRecipe.strDrinkThumb
        ) }
        alt="Imagem da Receita"
        data-testid={ `${index}-horizontal-image` }
      />
    </Link>
    <div className="done-recipe-detais">
      <span
        className="done-recipe-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'meal' ? (
          `${doneRecipe.strArea} - ${doneRecipe.strCategory}`
        ) : (
          `${doneRecipe.strAlcoholic}`
        ) }
      </span>
      <Link
        to={ type === 'meal' ? (
          `comidas/${doneRecipe.idMeal}`
        ) : (
          `bebidas/${doneRecipe.idDrink}`
        ) }
      >
        <span
          className="done-recipe-name"
          data-testid={ `${index}-horizontal-name` }
        >
          { type === 'meal' ? doneRecipe.strMeal : doneRecipe.strDrink }
        </span>
      </Link>
      <span
        className="done-recipe-date"
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneRecipe.date }
      </span>
      <input
        type="image"
        id={ type === 'meal' ? (
          `comidas-${doneRecipe.idMeal}`
        ) : (
          `bebidas-${doneRecipe.idDrink}`
        ) }
        className="done-recipe-share-icon"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIconPath }
        alt="Share"
        onClick={ handleClickShare }
      />
      { (type === 'meal') && (doneRecipe.strTags !== null) ? (
        doneRecipe.strTags.split(',', 2).map((tag) => (
          <span
            key={ index }
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
);

DoneCard.propTypes = {
  type: PropTypes.string.isRequired,
  doneRecipe: PropTypes.arrayOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
  handleClickShare: PropTypes.func.isRequired,
};

export default DoneCard;
