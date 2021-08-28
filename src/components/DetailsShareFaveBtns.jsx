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

  useEffect(() => {
    const checkFavorites = () => {
      if (localStorage.favoriteRecipes) {
        const storedFavorites = JSON
          .parse(localStorage.getItem('favoriteRecipes'));
        const faveArray = storedFavorites
          .some((item) => item.id === details.id);
        setIsFavorite(faveArray);
      }
    };
    checkFavorites();
  }, [details]);

  function setLocalStorage() {
    const newFaveArray = JSON.stringify([...favorites, details]);
    localStorage.setItem('favoriteRecipes', newFaveArray);
  }

  function removeFromLocalStorage() {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const editedFavorites = storedFavorites.filter((item) => item.id !== details.id);
    localStorage.setItem('favoriteRecipes', editedFavorites);
  }

  function handleFavoriteClick() {
    if (isFavorite) {
      setIsFavorite(false);
      const editedFavorites = favorites.filter((item) => item.id !== details.id);
      setFavorites(editedFavorites);
      removeFromLocalStorage();
    } else {
      setIsFavorite(true);
      setFavorites([...favorites, details]);
      setLocalStorage();
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
        className="fave-btn"
        onClick={ handleFavoriteClick }
      >
        { isFavorite
          ? <img src={ blackHeartIcon } data-testid="favorite-btn" alt="favorite icon" />
          : <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="favorite icon" /> }
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
