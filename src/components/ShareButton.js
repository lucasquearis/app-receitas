import React from 'react';
import icon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <button
      type="button"
      data-testid="share-btn"
      // onClick={ handleFavorite }
    >
      <img
        src={ icon }
        alt="share button"
        style={ { width: '58px' } }
      />
    </button>
  );
}

export default ShareButton;
