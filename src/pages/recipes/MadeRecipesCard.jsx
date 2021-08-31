import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import HandleFavoriteAndShare from './HandleFavoriteAndShare';

export default function MadeRecipesCard({ recipe, index, isFood, tags, doneDate }) {
  const { image, name, category, area, alcoholicOrNot, id } = recipe;
  return (
    <div>
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      {
        isFood ? (
          <div>
            <span data-testid={ `${index}-horizontal-top-text` }>
              { area }
              {' - '}
              {category}
            </span>
          </div>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
        )
      }
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Feita em: ${doneDate}`}
        </p>
      </Link>
      <HandleFavoriteAndShare
        index={ index }
        recipe={ recipe }
        id={ id }
        isFood={ recipe.type === 'comida' }
      />
      {tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </p>
      ))}
    </div>
  );
}

MadeRecipesCard.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
  isFood: bool.isRequired,
  tags: arrayOf(string).isRequired,
  doneDate: string.isRequired,
};
