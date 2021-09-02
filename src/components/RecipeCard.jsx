import React from 'react';
import { number, string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import './recipeCard.css';

export default function RecipeCard({ src, name, index, alt, id, foodPage }) {
  return (
    <Link
      to={ `/${foodPage ? 'comidas' : 'bebidas'}/${id}` }
      className="link-card-foods"
    >
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ src }
          alt={ alt }
        />
        <span className="recipe-name" data-testid={ `${index}-card-name` }>{name}</span>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  src: string.isRequired,
  name: string.isRequired,
  index: number.isRequired,
  alt: string.isRequired,
  id: string.isRequired,
  foodPage: bool,
};

RecipeCard.defaultProps = {
  foodPage: false,
};
