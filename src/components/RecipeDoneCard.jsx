import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function RecipeDoneCard({
  id,
  link,
  img,
  category,
  name,
  date,
  index,
  tagsName,
}) {
  return (
    <Link
      to={ link }
      className="meal"
      data-testid={ `${id}-recipe-card` }
    >
      <img
        width="300px"
        src={ img }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />

      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>

      <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>

      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>

      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share-icon"
      />

      { tagsName.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}

        </p>)) }

    </Link>
  );
}

RecipeDoneCard.defaultProps = {
  tagsName: null,
};

RecipeDoneCard.propTypes = {
  link: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tagsName: PropTypes.arrayOf(
    PropTypes.string,
  ),
};
