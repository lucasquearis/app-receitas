import { objectOf, string } from 'prop-types';
import React from 'react';
import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

function Title({ recipeDetails, recipeKey }) {
  return (
    <section className="step1-container">
      <h4 data-testid="recipe-title">{ recipeDetails[`str${recipeKey}`] }</h4>
      <div className="share-fav-btn-container">
        <ShareButton recipeDetails={ recipeDetails } />
        <FavoriteButton recipeDetails={ recipeDetails } />
      </div>
    </section>
  );
}

Title.propTypes = {
  recipeDetails: objectOf(string).isRequired,
  recipeKey: string.isRequired,
};

export default Title;
