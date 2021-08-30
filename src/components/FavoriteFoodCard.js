import React from 'react';

const FavoriteFoodCard = (recipe, index) => {
  const { image, name, type, area, category } = recipe;
  return (
    <div>
      <img
        src={ image }
        alt="recipe-img"
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
    </div>
  );
};

export default FavoriteFoodCard;
