import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { string, objectOf } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import favoriteRecipes from '../helper/setLocalStorage';
import { verificationIsFavorite } from '../helper/requiredDetails';

function Button({ recipe, type }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let bool;
    console.log(type, recipe);
    if (type === 'comida') {
      bool = verificationIsFavorite(recipe.idMeal);
    } else {
      bool = verificationIsFavorite(recipe.idDrink);
    }
    setIsFavorite(bool);
  }, [recipe, type]);

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
      <input
        type="image"
        onClick={ handleShare }
        src={ shareIcon }
        data-testid="share-btn"
        alt="To share"
      />
      <input
        type="image"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        data-testid="favorite-btn"
      />
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
