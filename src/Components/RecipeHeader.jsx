import React from 'react';
import { string, objectOf } from 'prop-types';
import Button from './Button';

function RecipeHeader({ thumb, title, category, recipe }) {
  return (
    <header>
      <img
        src={ thumb }
        alt={ title }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <h2 data-testid="recipe-category">{ category }</h2>
      <Button recipe={ recipe } />
    </header>
  );
}

RecipeHeader.propTypes = {
  title: string.isRequired,
  thumb: string.isRequired,
  category: string.isRequired,
  recipe: objectOf(string).isRequired,
};

export default RecipeHeader;
