import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteBtn({
  id,
  type,
  area = '',
  category = '',
  alcoholicOrNot = '',
  name,
  image,
}) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoriteRecipes
      .some((favoriteRecipe) => favoriteRecipe.id === id));
  }, [id, favoriteRecipes]);

  const handleClick = () => {
    if (isFavorite) {
      setFavoriteRecipes(favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id));
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      }]);
    }
  };

  return (
    <input
      alt="favorite-button"
      data-testid="favorite-btn"
      onClick={ handleClick }
      src={ (isFavorite) ? blackHeartIcon : whiteHeartIcon }
      type="image"
    />
  );
}

FavoriteBtn.defaultProps = {
  area: '',
  category: '',
  alcoholicOrNot: '',
};

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FavoriteBtn;
