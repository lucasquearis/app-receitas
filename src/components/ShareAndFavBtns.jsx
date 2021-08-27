import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import favIconChecked from '../images/blackHeartIcon.svg';
import {
  getDataFromLocalStorage,
  saveNewFavorite,
  saveOnLocalStorage,
} from '../helpers/saveOnLocalStorage';

export default function ShareAndFavBtns({ recipes }) {
  const location = useLocation();
  const currentPage = location.pathname;
  const curretPageURL = window.location.href;
  const { id } = useParams();

  const [msgLink, setMsgLink] = useState('');
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = () => {
    const favRecipes = getDataFromLocalStorage('favoriteRecipes');
    if (favRecipes.some((fav) => fav.id === id)) {
      setFavorited(false);
      saveOnLocalStorage('favoriteRecipes', favRecipes.filter((fav) => fav.id !== id));
    } else {
      const page = currentPage.includes('comidas') ? 'comida' : 'bebida';
      setFavorited(true);
      const addNewFav = saveNewFavorite(recipes, page);
      saveOnLocalStorage('favoriteRecipes', [...favRecipes, addNewFav]);
    }
  };

  const onClickShare = () => {
    setMsgLink('Link copiado!');
    navigator.clipboard.writeText(`${curretPageURL}`);
  };

  useEffect(() => {
    const favorites = getDataFromLocalStorage('favoriteRecipes');
    favorites.forEach((favorite) => {
      if (favorite.id === id) setFavorited(true);
    });
  }, [id]);

  return (
    <div>
      <p>{msgLink}</p>
      <button
        type="button"
        style={ { border: 'none', background: 'none' } }
        onClick={ onClickShare }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>
      <button
        type="button"
        style={ { border: 'none', background: 'none' } }
        onClick={ onClickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ !favorited ? favIcon : favIconChecked }
          alt="Favoritar"
        />
      </button>
    </div>
  );
}

ShareAndFavBtns.propTypes = {
  recipes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};
