import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <label htmlFor="share-btn">
      <input
        src={ shareIcon }
        alt="share button"
        name="share-btn"
        classeName="share-btn"
        data-testid="share-btn"
        type="image"
      />
    </label>
  );
}

export default ShareButton;
