import React from 'react';
import { Button } from 'react-bootstrap';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton() {
  // const favoriteRecipes = [{
  //   id,
  //   type,
  //   area,
  //   category,
  //   alcoholicOrNot,
  //   name,
  //   image,
  // }];
  return (
    <Button
      variant="success"
      data-testid="favorite-btn"
      type="button"
    >
      <img src={ whiteHeartIcon } alt="favorite-icon" />
    </Button>
  );
}

export default FavoriteButton;
