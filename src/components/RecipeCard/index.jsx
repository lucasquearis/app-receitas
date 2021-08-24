import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ image, name }) {
  return (
    <div>
      <img src={ image } alt="Recipe" />
      <p>{ name }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeCard;
