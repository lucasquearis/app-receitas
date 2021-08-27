import React from 'react';

import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoriteButton() {
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ WhiteHeartIcon }
      >
        <img src={ WhiteHeartIcon } alt="Botão de favorito" />
      </button>
    </div>
  );
}
