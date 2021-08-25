import React, { useState, useEffect } from 'react';
import { bool, func, string } from 'prop-types';
import { Button } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const DetailsButtonsField = (props) => {
  const { handleShare, handleFavorite, shared, recipeId } = props;
  const [heart, setHeart] = useState(whiteHeartIcon);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.some((recipe) => recipe.id === recipeId)) {
      setHeart(blackHeartIcon);
    }
  }, [recipeId]);

  const handleClick = () => {
    handleFavorite();
    if (heart === whiteHeartIcon) {
      setHeart(blackHeartIcon);
    } else {
      setHeart(whiteHeartIcon);
    }
  };

  return (
    <div>
      <Button className="share-btn" type="button" onClick={ handleShare }>
        <img src={ shareIcon } alt="Share" data-testid="share-btn" />
      </Button>
      <Button className="favorite-btn" type="button" onClick={ handleClick }>
        <img src={ heart } alt="Favorite" data-testid="favorite-btn" />
      </Button>
      { shared && <p>Link copiado!</p> }
    </div>
  );
};

DetailsButtonsField.propTypes = {
  handleShare: func.isRequired,
  handleFavorite: func.isRequired,
  shared: bool.isRequired,
  recipeId: string.isRequired,
};

export default DetailsButtonsField;
