import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ recipeId, isFood, index }) {
  const [displayToast, setDisplayToast] = useState(false);
  const WAIT_TIME = 3000;

  function handleShareClick() {
    copy(`http://localhost:3000/${isFood ? 'comidas' : 'bebidas'}/${recipeId}`);
    setDisplayToast(true);

    setTimeout(() => {
      setDisplayToast(false);
    }, WAIT_TIME);
  }

  return (
    <>
      {displayToast && <p className="toast">Link copiado!</p>}
      <button
        type="button"
        data-testid={ `${index !== undefined ? `${index}-horizontal-` : ''}share-btn` }
        onClick={ handleShareClick }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="compartilhar" />
      </button>
    </>
  );
}

ShareButton.propTypes = {
  recipeId: PropTypes.string,
  isFood: PropTypes.string,
  isDrink: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
