import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Context from '../../../context';
import heart from '../../../images/whiteHeartIcon.svg';
import fullHeart from '../../../images/blackHeartIcon.svg';

function FavoriteIcon({ recipe, dataTestId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteList, setFavoriteList } = useContext(Context);

  useEffect(() => {
    const bool = !!favoriteList.find((item) => item.id === recipe.id);
    setIsFavorite(bool);
  }, [favoriteList, setIsFavorite, recipe]);

  return (
    <button type="button" onClick={ () => setFavoriteList(recipe) }>
      <Image
        data-testid={ dataTestId }
        className="header-icon"
        src={ isFavorite ? fullHeart : heart }
        alt="heart-icon"
      />
    </button>
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default FavoriteIcon;
