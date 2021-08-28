import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Details.css';

function DetailsShareFaveBtns({ details }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { favorites, setFavorites } = useContext(Context);

  // aprendido por aqui: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
  function copyRecipeURL() {
    const url = document.createElement('input');
    url.value = window.location.href;
    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
    setIsCopied(true);
  }

  // useEffect(() => {
  //   if (isFavorite) {
  //     const newFaveArray = JSON.stringify([
  //       ...favorites,
  //     ]);
  //     localStorage.setItem('favoriteRecipes', newFaveArray);
  //   } else {
  //     const array = favorites.filter((item) => item.id !== details.id);
  //     localStorage.setItem('favoriteRecipes', array);
  //   }
  // }, [isFavorite, favorites, details.id]);

  function handleFavoriteClick() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      setFavorites([...favorites, details]);
    }
  }

  return (
    <div className="share-fave-btns">
      { isCopied
        ? <div className="copy-div">Link copiado! </div>
        : <div className="copy-div" /> }
      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ copyRecipeURL }
      >
        <img src={ shareIcon } alt="share icon" className="share-icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        className="fave-btn"
        onClick={ handleFavoriteClick }
      >
        { isFavorite
          ? <img src={ blackHeartIcon } alt="favorite icon" />
          : <img src={ whiteHeartIcon } alt="favorite icon" /> }
      </button>
    </div>
  );
}

DetailsShareFaveBtns.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default DetailsShareFaveBtns;
