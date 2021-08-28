import React from 'react';
import PropTypes from 'prop-types';

export default function ListDetails({ ingredients, measures }) {
  return ingredients.map((ingredient, index) => {
    if (!measures[index]) {
      return (
        <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
          {ingredient}
        </li>);
    }
    return (
      <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
        {ingredient}
        -
        {measures[index]}
      </li>
    );
  });
}

ListDetails.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
