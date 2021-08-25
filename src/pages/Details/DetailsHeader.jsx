import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './DetailsHeader.css';
import copy from 'clipboard-copy';
import share from '../../images/shareIcon.svg';
import heart from '../../images/whiteHeartIcon.svg';
import fullHeart from '../../images/blackHeartIcon.svg';

function DetailsHeader({ title, subtitle, favorite, url }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const findFavorite = data.find((item) => item.id === favorite.id);
    const bool = !!findFavorite;
    setIsFavorite(bool);
  }, [setIsFavorite, favorite]);

  const setLocalStorage = () => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key));
    if (isFavorite) {
      const value = data.filter((item) => item.id !== favorite.id);
      localStorage.setItem(key, JSON.stringify(value));
      setIsFavorite(!isFavorite);
    } else {
      const value = data ? [...data, favorite] : [favorite];
      localStorage.setItem(key, JSON.stringify(value));
      setIsFavorite(!isFavorite);
    }
  };

  const handleCopy = () => {
    const currentUrl = `localhost:3000${url}`;
    console.log(currentUrl);
    copy(`http://localhost:3000${url}`);
    setIsCopied(true);
  };

  return (
    <header className="header-container">
      <div className="header-title-container">
        <h1 data-testid="recipe-title" className="header-title">{title}</h1>
        <h4 data-testid="recipe-category" className="header-subtitle">{subtitle}</h4>
      </div>
      <div className="header-icons-container">
        <div className="buttons-container">
          <button onClick={ handleCopy } data-testid="share-btn" type="button">
            <Image
              className="header-icon"
              src={ share }
              alt="share-icon"
            />
          </button>
          <button type="button" onClick={ setLocalStorage }>
            <Image
              data-testid="favorite-btn"
              className="header-icon"
              src={ isFavorite ? fullHeart : heart }
              alt="heart-icon"
            />
          </button>
        </div>
        {isCopied && <p className="copied-msg">Link copiado!</p>}
      </div>
    </header>
  );
}

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  favorite: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default DetailsHeader;
