import React from 'react';

function RecipeCard(key, img, name) {
  return (
    <div key={ key }>
      <img src={ img } alt={ name } />
      <h3>{ name }</h3>
    </div>
  );
}

export default RecipeCard;
