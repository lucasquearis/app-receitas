// vitals
import React from 'react';
import PropTypes from 'prop-types';
// styles
import '../styles/FavoriteRecipes.css';
import favoriteButton from '../images/blackHeartIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const renderTitle = (alcoholicOrNot, area, category, type) => {
  if (type === 'bebida' && alcoholicOrNot.includes('Non')) {
    return (
      <div className="title-container">
        <h5>{alcoholicOrNot}</h5>
      </div>
    );
  }
  if (type === 'comida' && area) {
    return (
      <div className="title-container">
        <h4>{`${area} - ${category}`}</h4>
      </div>
    );
  }
  return (
    <div className="title-container">
      <h4>{category}</h4>
    </div>
  );
};

function FavoriteRecipeCard({ alcoholicOrNot, area, category, image, name, type }) {
  return (
    <div className="card-element">
      <div className="favorites-image-container">
        <img src={ image } alt="" />
      </div>
      <div className="info-container">
        { renderTitle(alcoholicOrNot, area, category, type)}
        <div className="name-container">
          <h4>{name}</h4>
        </div>
        <div className="favorite-and-share-buttons">
          <img src={ favoriteButton } alt="Ícone de favorito" />
          <img src={ searchIcon } alt="Ícone de copiar" />
        </div>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  image: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
export default FavoriteRecipeCard;
