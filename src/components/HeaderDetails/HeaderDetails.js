import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './HeaderDetails.css';

const HeaderDetails = ({ image, title, category, recipe, id }) => {
  const [copied, setCopied] = useState('');
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteList) {
      const finded = favoriteList.find((favo) => favo.id === id);
      if (finded) setFavorite(true);
    }
  }, [id]);
  const copyLink = () => {
    const link = window.location.href;
    copy(link.replace('/in-progress', ''));
    setCopied('Link copiado!');
  };
  const favoriteSet = () => {
    let localStorageObj = {};
    if (Object.keys(recipe)[0].includes('Drink')) {
      const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipe;
      localStorageObj = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
    } else {
      const { idMeal, strCategory, strArea, strMeal, strMealThumb } = recipe;
      localStorageObj = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
    }
    let listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (listFavorite) {
      listFavorite.push(localStorageObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(listFavorite));
      setFavorite(true);
    } else {
      listFavorite = [];
      listFavorite.push(localStorageObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(listFavorite));
      setFavorite(true);
    }
  };
  const favoriteClick = () => {
    if (favorite) {
      const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterFavorite = favoriteList.filter((favo) => favo.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
      setFavorite(false);
    } else {
      favoriteSet();
    }
  };
  return (
    <header className="header-details">
      <img
        src={ image }
        alt={ title }
        data-testid="recipe-photo"
        className="img-header"
      />
      <div className="info-container">
        <section>
          <h1 data-testid="recipe-title" className="title-details">{title}</h1>
          <p data-testid="recipe-category" className="subtitle-details">{category}</p>
        </section>
        <section className="buttons-container">
          <label htmlFor="share">
            <input
              className="input-image"
              id="share"
              type="image"
              alt="Botão compartilhar"
              src={ shareIcon }
              data-testid="share-btn"
              onClick={ copyLink }
            />
            {copied}
          </label>
          <label htmlFor="favorite">
            <input
              className="input-image"
              id="favorite"
              type="image"
              src={ favorite ? blackHeartIcon : favoriteIcon }
              alt="Botão de favoritar"
              data-testid="favorite-btn"
              onClick={ favoriteClick }
            />
          </label>
        </section>
      </div>
    </header>
  );
};
HeaderDetails.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};

export default HeaderDetails;
