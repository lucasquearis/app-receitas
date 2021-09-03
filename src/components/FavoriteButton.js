/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { infos } = props;
  const { id } = infos;

  const getFavorite = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [favorite, setFavorite] = useState();

  useEffect(() => {
    const storage = getFavorite();
    if (!storage) { // n existe algum favorito? seta um novo localStorage
      localStorage.setItem('favoriteRecipes', []);
    }
    setFavorite(getFavorite().some((currentInfos) => currentInfos.id === id));
  }, [setFavorite, id]);

  const removeFavorite = (currentId) => {
    const filtered = getFavorite().filter((ids) => ids.id !== currentId) || [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setFavorite(false);
  };

  const addFavorite = (item) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavorite(), item]));
    setFavorite(true);
  };

  return (
    <div className="favorite-btn">
      <button
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => {
          const filtered = getFavorite().some((ids) => ids.id === id);
          // console.log(filtered);
          if (!filtered) { // id já existe? se sim remove
            addFavorite(infos);
          } else { // vai copiar o q já tinha e adiciona uma novo obj de uma nova receita
            removeFavorite(id);
          }
          // }
        } }
      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="favorite-icon" />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  infos: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteButton;
