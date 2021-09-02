import { objectOf, string } from 'prop-types';
import React from 'react';

function Header({ recipeDetails, recipeKey }) {
  return (
    <img
      src={ recipeDetails[`str${recipeKey}Thumb`] }
      data-testid="recipe-photo"
      alt="Recipe"
    />);
}

Header.propTypes = {
  recipeDetails: objectOf(string).isRequired,
  recipeKey: string.isRequired,
};

export default Header;
