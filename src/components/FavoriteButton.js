import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton(props) {
  const [favorite, setFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const { recipe, testId } = props;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')).filter(
        (favRecipe) => favRecipe.id !== recipe.id || favRecipe.type !== recipe.type,
      ));
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')).some(
        (favRecipe) => favRecipe.id === recipe.id && favRecipe.type === recipe.type,
      ));
    }
  }, [recipe]);

  useEffect(() => {
    if (favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList, recipe]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList]));
    }
  }, [favorite, favoriteList, recipe]);

  const handleClick = () => {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          type="image/svg+xml"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          data-testid={ testId }
          alt="Adicionar a favoritos"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
