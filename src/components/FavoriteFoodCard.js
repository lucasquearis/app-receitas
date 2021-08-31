import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../context/FoodContext';
import './favoriteFoodCard.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FavoriteFoodCard = ({ recipe, index }) => {
  const { id, image, name, area, category } = recipe;
  const [favorite, setFavorite] = useState(true);
  const { changed, setChanged } = useContext(FoodContext);

  function onFavorite() {
    setFavorite(!favorite);

    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const item = { id, type: 'comida', area, category, alcoholicOrNot: '', name, image };
    if (actualStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([item]));
      return;
    }

    if (!favorite) {
      actualStorage.push(item);
      localStorage.setItem('favoriteRecipes', JSON.stringify(actualStorage));
    } else {
      const newStorage = actualStorage.filter(
        (favoriteItem) => favoriteItem.id !== item.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
    setChanged(!changed);
  }

  const getFavorite = () => {
    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (actualStorage && recipe.length > 0) {
      const isFavorited = actualStorage.some(
        (item) => item.id === recipe.id,
      );
      setFavorite(isFavorited);
    }
  };

  useEffect(() => {
    getFavorite();
  }, [recipe]);

  return (
    <div className="fav-food-card">
      <img
        src={ image }
        alt="recipe-img"
        data-testid={ `${index}-horizontal-image` }
        className="fav-food-image"
      />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</p>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        <div>
          <input
            type="image"
            src={ shareIcon }
            alt="share-icon"
            data-testId={ `${index}-horizontal-share-btn` }
          />
          <input
            type="image"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="share-icon"
            onClick={ onFavorite }
            data-testId={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      </div>
    </div>
  );
};

FavoriteFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    length: PropTypes.number,
  }).isRequired,
};

export default FavoriteFoodCard;
