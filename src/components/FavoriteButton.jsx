import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipe, id, type }) {
  const [icon, setIcon] = useState(whiteHeartIcon);
  const { strDrinkThumb,
    strDrink, strCategory, strAlcoholic, strMealThumb, strMeal, strArea } = recipe;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const saved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const alreadyFavorite = saved.some((item) => item.id === id);
    if (alreadyFavorite) {
      setIcon(blackHeartIcon);
    }
  }, []);

  const favoriteDrinks = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const favoriteFoods = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const setFavorite = () => {
    let favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];

    if (type === 'drink') {
      favorites = [...favorites, favoriteDrinks];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      favorites = [...favorites, favoriteFoods];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
  };

  function toggleHeartIcon() {
    const bool = icon === whiteHeartIcon
      ? setIcon(blackHeartIcon) : setIcon(whiteHeartIcon);
    if (icon === blackHeartIcon) {
      let favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      favorites = favorites.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
    if (icon === whiteHeartIcon) {
      return setFavorite();
    }
    return bool;
  }

  return (
    <div>
      <Image
        data-testid="favorite-btn"
        alt="heart"
        src={ icon }
        onClick={ () => toggleHeartIcon() }
      />
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
