import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import FoodContext from '../context/FoodContext';
import Copy from './Clipboard-Copy';
import './favoriteFoodCard.css';

const FavoriteDrinkCard = ({ recipe, index }) => {
  const { id, image, name, alcoholicOrNot } = recipe;
  const [copy, setCopy] = useState('');
  const [favorite, setFavorite] = useState(true);
  const { changed, setChanged } = useContext(FoodContext);

  function DetailUrl() {
    const url = window.location.href;
    const splitUrl = url.split('receitas-favoritas');
    const newUrl = splitUrl[0];
    if (recipe.type === 'bebida') {
      const detailUrl = `${newUrl}bebidas/${id}`;
      Copy(detailUrl);
      setCopy(true);
    }
  }

  function onFavorite() {
    setFavorite(!favorite);

    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const item = {
      id, type: 'comida', area: '', category: '', alcoholicOrNot: '', name, image,
    };
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

  useEffect(() => {
    const getFavorite = () => {
      const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (actualStorage && recipe.length > 0) {
        const isFavorited = actualStorage.some(
          (item) => item.id === recipe.id,
        );
        setFavorite(isFavorited);
      }
    };
    getFavorite();
  }, [changed, recipe]);

  return (
    <div className="fav-food-card">
      <Link to={ `/bebidas/${id}` }>
        <img
          src={ image }
          alt="recipe-img"
          data-testid={ `${index}-horizontal-image` }
          className="fav-food-image"
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{ `${alcoholicOrNot}` }</p>
        <Link to={ `/bebidas/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </Link>
        <div>
          <input
            type="image"
            src={ shareIcon }
            alt="share-icon"
            onClick={ DetailUrl }
            data-testId={ `${index}-horizontal-share-btn` }
          />
          <input
            type="image"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="share-icon"
            onClick={ onFavorite }
            data-testId={ `${index}-horizontal-favorite-btn` }
          />
          { copy ? <p>Link copiado!</p> : undefined }
        </div>
      </div>
    </div>
  );
};

FavoriteDrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    length: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteDrinkCard;
