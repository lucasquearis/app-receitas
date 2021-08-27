import React from 'react';
import { string, bool, func } from 'prop-types';
import Button from './Button';

function RecipeHeader(props) {
  const {
    thumb,
    title,
    category,
    isFavorite,
    handleFavorite,
    handleShare,
  } = props;

  return (
    <header>
      <img
        src={ thumb }
        alt={ title }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <h2 data-testid="recipe-category">{ category }</h2>
      <Button
        favorite={ isFavorite }
        handleFavorite={ handleFavorite }
        handleShare={ handleShare }
      />
    </header>
  );
}

RecipeHeader.propTypes = {
  title: string.isRequired,
  thumb: string.isRequired,
  category: string.isRequired,
  isFavorite: bool.isRequired,
  handleFavorite: func.isRequired,
  handleShare: func.isRequired,
};

export default RecipeHeader;
