/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { infos } = props;
  const { id } = infos;
  // console.log(infos);

  const getFavorite = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const removeFavorite = (currentId) => {
    const filtered = getFavorite().filter((ids) => ids.id !== currentId) || [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
  };

  const addFavorite = (item) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(...getFavorite(), item));
  };

  const [favorite, setFavorite] = useState();

  useEffect(() => setFavorite(getFavorite()
    .find(({ currentId }) => currentId === id)),
  [setFavorite, id]);

  return (
    <div className="favorite-btn">
      <button
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        type="button"
        onClick={ () => {
          if (favorite) {
            removeFavorite(id);
            setFavorite(false);
          } else {
            addFavorite([infos]);
            setFavorite(true);
          }
        } }

      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="favorite-icon" />
      </button>
    </div>
  );
}

// FavoriteButton.propTypes = {
//   infos: infos.PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default FavoriteButton;
