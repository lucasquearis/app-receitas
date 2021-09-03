import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { func, string } from 'prop-types';
import { Button } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getLocalStorage } from '../../utils';
import './style.css';

const DetailsButtonsField = ({ recipeType, handleFavorite }) => {
  const { id } = useParams();
  const [shared, setShared] = useState(false);
  const [heart, setHeart] = useState(whiteHeartIcon);

  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
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
      <div className="divDetails">
        <Button className="favorite-btn-details" type="button" onClick={ handleClick }>
          <img
            src={ heart }
            alt="Favorite"
            data-testid="favorite-btn"
            className="favoirite-btn"
          />
        </Button>

        <Button className="share-btn-details" type="button" onClick={ handleShare }>
          <img
            src={ shareIcon }
            alt="Share"
            data-testid="share-btn"
            className="share-btn"
          />
        </Button>
      </div>
      { shared && <p className="link-shared">Link copiado!</p> }
    </div>
  );
};

DetailsButtonsField.propTypes = {
  recipeType: string.isRequired,
  handleFavorite: func.isRequired,
};

export default DetailsButtonsField;
