import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { string, objectOf } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import favoriteRecipes from '../helper/setLocalStorage';

function Button({ recipe, type }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes(recipe, type)));
  };

  const handleShare = async () => {
    const time = 2000;
    navigator.clipboard.writeText(window.location.href);
    setShow(true);
    await setTimeout(() => setShow(false), time);
  };

  return (
    <>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="To share"
        />
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite"
        />
      </button>
      <Alert show={ show }>
        Link copiado!
      </Alert>
    </>
  );
}

Button.propTypes = {
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
};

export default Button;
