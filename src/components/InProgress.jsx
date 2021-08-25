import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function InProgress({ recipe, details }) {
  const [favorite, setFavorite] = useState(false);
  const favoriteIcon = favorite ? blackHeartIcon : whiteHeartIcon;
  return (
    <div className="in-progress">
      <img src="" alt="" data-testid="recipe-photo" />
      <div className="main-infos">
        <h1 data-testid="recipe-title">Title</h1>
        <input
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ () => setFavorite(!favorite) }
        />
        <input
          data-testid="favorite-btn"
          type="button"
          src={ favoriteIcon }
          onClick={ () => setFavorite(!favorite) }
        />
      </div>
      <h2 data-testid="recipe-category">Category</h2>
      <ul>
        <li data-testid={ `${favorite}-ingredient-step` } />
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, repudiandae.
      </p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}
