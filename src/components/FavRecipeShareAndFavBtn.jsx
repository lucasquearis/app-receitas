import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import favIconChecked from '../images/blackHeartIcon.svg';
import {
  getDataFromLocalStorage,
  saveNewFavorite,
  saveOnLocalStorage,
} from '../helpers/saveOnLocalStorage';

export default function FavRecipeShareAndFavBtn({ recipes, index }) {
  const location = useLocation();
  const currentPage = location.pathname;
  const foodURL = 'http://localhost:3000/comidas/';
  const drinkURL = 'http://localhost:3000/bebidas/';
  const [msgLink, setMsgLink] = useState('');
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = () => {
    const favRecipes = getDataFromLocalStorage('favoriteRecipes');
    if (favRecipes.some((fav) => fav.id)) {
      setFavorited(false);
      saveOnLocalStorage('favoriteRecipes', favRecipes.filter((fav) => fav.id));
    } else {
      const page = currentPage.includes('comidas') ? 'comida' : 'bebida';
      setFavorited(true);
      const addNewFav = saveNewFavorite(recipes, page);
      saveOnLocalStorage('favoriteRecipes', [...favRecipes, addNewFav]);
    }
  };

  const onClickShare = () => {
    setMsgLink('Link copiado!');
    if (recipes.type.includes('comida')) {
      navigator.clipboard.writeText(`${foodURL}${recipes.id}`);
    } else {
      navigator.clipboard.writeText(`${drinkURL}${recipes.id}`);
    }
  };

  useEffect(() => {
    const favorites = getDataFromLocalStorage('favoriteRecipes');
    favorites.forEach((favorite) => {
      if (favorite.id) setFavorited(true);
    });
  }, []);

  return (
    <div>
      <p>{msgLink}</p>
      <button
        type="button"
        style={ { border: 'none', background: 'none' } }
        onClick={ onClickShare }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Compartilhar"
        />
      </button>
      <button
        type="button"
        style={ { border: 'none', background: 'none' } }
        onClick={ onClickFavorite }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ !favorited ? favIcon : favIconChecked }
          alt="Favoritar"
        />
      </button>
    </div>
  );
}

FavRecipeShareAndFavBtn.propTypes = {
  recipes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  index: PropTypes.number.isRequired,
};
