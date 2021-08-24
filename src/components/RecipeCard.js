import React from 'react';
import { string, number } from 'prop-types';

function RecipeCard(props) {
  const { thumb, title, index } = props;
  return (
    <li data-testid={ `${index}-recipe-card` }>
      <img src={ thumb } alt="Recipe" data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>
        { title }
      </h2>
    </li>
  );
}

RecipeCard.propTypes = {
  thumb: string.isRequired,
  title: string.isRequired,
  index: number.isRequired,
};

export default RecipeCard;
