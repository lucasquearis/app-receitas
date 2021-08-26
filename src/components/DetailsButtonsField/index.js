import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { func, string } from 'prop-types';
import { Button } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const DetailsButtonsField = ({ recipeType, handleFavorite }) => {
  const { id } = useParams();
  const [shared, setShared] = useState(false);
  const [heart, setHeart] = useState(whiteHeartIcon);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.some((recipe) => recipe.id === id)) {
      setHeart(blackHeartIcon);
    }
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000/${recipeType}/${id}`);
    setShared(true);
  };

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
  recipeType: string.isRequired,
  handleFavorite: func.isRequired,
};

export default DetailsButtonsField;
