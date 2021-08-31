import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getFavorite from '../services/getFavorite';
import wIcon from '../images/whiteHeartIcon.svg';
import bIcon from '../images/blackHeartIcon.svg';

const FavoriteChanger = (itFavoriteOrNot) => {
  if (itFavoriteOrNot) return bIcon;
  return wIcon;
};

function FavoriteButton(props) {
  const { id } = props;
  const initialfavorite = getFavorite(id);
  const [favorbutton, setfavorite] = useState(initialfavorite ? bIcon : wIcon);
  return (
    <button
      type="button"
      onClick={ () => { setfavorite(FavoriteChanger(getFavorite(id))); } }
    >
      <img data-testid="favorite-btn" src={ favorbutton } alt="white-heart" />
    </button>
  );
}

const { string } = PropTypes;
FavoriteButton.propTypes = {
  id: string.isRequired,
};

export default FavoriteButton;
