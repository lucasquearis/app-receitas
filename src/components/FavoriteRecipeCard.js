// vitals
import React from 'react';
import PropTypes from 'prop-types';
// styles
import '../styles/FavoriteRecipes.css';

function FavoriteRecipeCard({ image, area, category, name }) {
  return (
    <div className="card-element">
      <div className="favorites-image-container">
        <img src={ image } alt="" />
      </div>
      <div className="info-container">
        <div className="title-container">
          {area ? <h5>{`${area} - ${category}`}</h5> : <h5>{category}</h5>}
        </div>
        <div className="name-container">
          <h4>{name}</h4>
        </div>
        <div className="favorite-and-share-buttons">
          botão de favorito e compartilhar
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
}.isRequired;
export default FavoriteRecipeCard;
