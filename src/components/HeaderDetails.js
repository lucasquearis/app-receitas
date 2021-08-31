import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { clipboardCopy } from '../utils';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function HeaderDetails(
  { area, name, img, aux, alcoholic },
) {
  const [heartColor, setHeartColor] = useState(whiteHeartIcon);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const ONE = 1;
  const SEVEN = 7;
  const type = pathname.slice(ONE, SEVEN);

  useEffect(() => {
    const checkIsFavorite = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const checkId = checkIsFavorite.map((checkedId) => checkedId.id);
    const favoriteId = checkId.some((storageId) => storageId === id);

    return (favoriteId ? setHeartColor(blackHeartIcon) : setHeartColor(whiteHeartIcon));
  }, [id]);

  const handleFavorite = () => {
    const checkIsFavorite = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const localStorageId = checkIsFavorite.map((recipe) => recipe.id);
    const filteredLocalStorage = checkIsFavorite.filter(
      (recipeFav) => recipeFav.id !== id,
    );
    const checkFavoriteId = localStorageId.some((storageId) => id === storageId);

    if (checkFavoriteId) {
      const updatedLocalStorage = JSON.stringify(filteredLocalStorage);
      localStorage.setItem('favoriteRecipes', updatedLocalStorage);
      setHeartColor(whiteHeartIcon);
    }

    if (!checkFavoriteId) {
      const favorite = {
        id,
        type,
        area,
        category: aux,
        alcoholicOrNot: alcoholic,
        name,
        image: img,
      };

      filteredLocalStorage.push(favorite);
      const finalLocalStorage = JSON.stringify(filteredLocalStorage);
      localStorage.setItem('favoriteRecipes', finalLocalStorage);
      setHeartColor(blackHeartIcon);
    }
  };

  return (
    <header>
      <img src={ img } alt={ name } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ name }</h1>
      <input
        src={ shareIcon }
        alt="Share Icon"
        type="image"
        data-testid="share-btn"
        onClick={ () => clipboardCopy(type, id) }
      />
      <span id={ `share-text${id}` } />
      <input
        src={ heartColor }
        alt="Favorite Icon"
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      />
      { aux && <p data-testid="recipe-category">{ aux }</p> }
      { alcoholic && <p data-testid="recipe-category">{ alcoholic }</p> }
    </header>
  );
}

HeaderDetails.defaultProps = {
  area: '',
  alcoholic: '',
};

HeaderDetails.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string.isRequired,
  area: PropTypes.string,
  alcoholic: PropTypes.string,
};
