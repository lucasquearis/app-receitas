import React, { useState } from 'react';
import Proptypes from 'prop-types';
import icon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ recipeDetails }) {
  const [isCopied, setIsCopied] = useState(false);
  let path = '';
  if ('idMeal' in recipeDetails) {
    path = `http://localhost:3000/comidas/${recipeDetails.idMeal}`;
  }
  if ('idDrink' in recipeDetails) {
    path = `http://localhost:3000/bebidas/${recipeDetails.idDrink}`;
  }

  const handleShare = () => {
    copy(path);
    setIsCopied(true);
  };

  return (
    <button
      src={ icon }
      type="button"
      data-testid="share-btn"
      onClick={ handleShare }
    >
      <img
        src={ icon }
        alt="share button"
        style={ { width: '30px' } }
      />
      {isCopied && 'Link copiado!'}
    </button>
  );
}

ShareButton.propTypes = {
  recipeDetails: Proptypes.objectOf(Proptypes.string).isRequired,
};

export default ShareButton;
