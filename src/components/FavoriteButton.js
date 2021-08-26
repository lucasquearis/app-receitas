import React, { useState, useEffect } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';


function FavoriteButton(props) {
  const [ favorite, setFavorite ] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const { recipe } = props;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')).filter(
        (favRecipe) => favRecipe.id !== recipe.id || favRecipe.type !== recipe.type));
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')).some(
        (favRecipe) => favRecipe.id === recipe.id && favRecipe.type === recipe.type));
    }
  }, [])

  useEffect(() => {
    if (favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList, recipe]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList]));
    }
  }, [favorite])

  const handleClick = () => {
    favorite === false ? setFavorite(true) : setFavorite(false);
  }

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

export default FavoriteButton;
