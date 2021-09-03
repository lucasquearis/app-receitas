import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Copy from 'clipboard-copy';
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
  const [clickShare, seClickShare] = useState(false);

  const handleClickShare = () => {
    if (type === 'comida') {
      Copy(`http://localhost:3000/comidas/${id}`);
    } else {
      Copy(`http://localhost:3000/bebidas/${id}`);
    }
    seClickShare(true);
  };

  const renderShareButton = (shareId) => (
    <button
      type="button"
      data-testid={ shareId }
      onClick={ handleClickShare }
      className="share-button"
    >
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share-icon"
      />
    </button>
  );

  const renderDoneDateAndTagsName = () => (
    <>
      <span data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </span>

      { tagsName.map((tag) => (
        <span
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}

        </span>)) }
    </>
  );

  if (type === 'comida') {
    return (
      <Link
        to={ `/comidas/${id}` }
        className="recipe-done-card"
        data-testid={ `${id}-recipe-card` }
      >
        <img
          width="150px"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <div className="recipe-done-card-infos">
          <h2 data-testid={ `${index}-horizontal-name` }>
            {name}
          </h2>

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          { renderDoneDateAndTagsName() }
          { clickShare
            ? <span>Link copiado!</span> : renderShareButton('share-meal-btn') }
        </div>

      </Link>

    );
  }
  return (
    <Link
      to={ `/bebidas/${id}` }
      className="recipe-done-card"
      data-testid={ `${id}-recipe-card` }
    >
      <img
        width="150px"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />

      <div className="recipe-done-card-infos">
        <h2 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h2>

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        { renderDoneDateAndTagsName() }
        { clickShare ? <span>Link copiado!</span> : renderShareButton('share-drink-btn') }
      </div>

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
