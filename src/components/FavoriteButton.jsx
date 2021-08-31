import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../helpers/useLocalStorage';

function FavoriteButton(props) {
  const [favorite, setFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const { recipe } = props;

  useEffect(() => {
    if (favoriteRecipes) {
      setFavoriteList(favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id || favRecipe.type !== recipe.type,
      ));
      setFavorite(favoriteRecipes.some(
        (favRecipe) => favRecipe.id === recipe.id && favRecipe.type === recipe.type,
      ));
    }
  }, [recipe]);

  useEffect(() => {
    if (favorite) {
      setFavoriteRecipes([...favoriteList, recipe]);
    } else {
      setFavoriteRecipes([...favoriteList]);
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
          data-testid="favorite-btn"
          alt="Adicionar a favoritos"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default FavoriteButton;
