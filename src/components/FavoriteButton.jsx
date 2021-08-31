import React, { useState } from 'react';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  const [heart] = useState(whiteHeartIcon);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      <img src={ heart } alt="Favorite" data-testid="favorite-btn" />
    </button>
  );
}

export default FavoriteButton;
