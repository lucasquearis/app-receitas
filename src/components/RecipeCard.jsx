import React from 'react';
import { number, string } from 'prop-types';

export default function RecipeCard({ src, name, index, alt }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ src }
        alt={ alt }
      />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

RecipeCard.propTypes = {
  src: string.isRequired,
  name: string.isRequired,
  index: number.isRequired,
  alt: string.isRequired,
};
