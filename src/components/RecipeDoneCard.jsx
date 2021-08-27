import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function RecipeDoneCard({
  id,
  type,
  area,
  category,
  alcoholicOrNot,
  name,
  image,
  doneDate,
  tagsName,
  index,
}) {
  if (type === 'comida') {
    return (
      <Link
        to={ `/comidas/${id}` }
        className="mealDoneCard"
        data-testid={ `${id}-recipe-card` }
      >
        <img
          width="300px"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />

        <h2 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h2>

        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${area} - ${category}` }
        </p>

        <p data-testid={ `${index}-horizontal-done-date` }>
          {doneDate}
        </p>

        { tagsName.map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}

          </p>)) }

        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-icon"
        />

      </Link>
    );
  }
  return (
    <Link
      to={ `/bebidas/${id}` }
      className="drinkDoneCard"
      data-testid={ `${id}-recipe-card` }
    >
      <img
        width="300px"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />

      <h2 data-testid={ `${index}-horizontal-name` }>
        {name}
      </h2>

      <p data-testid={ `${index}-horizontal-top-text` }>
        { alcoholicOrNot }
      </p>

      <p data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </p>

      { tagsName.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}

        </p>)) }

      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share-icon"
      />

    </Link>
  );
}

RecipeDoneCard.defaultProps = {
  tagsName: null,
};

RecipeDoneCard.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tagsName: PropTypes.arrayOf(
    PropTypes.string,
  ),
};
