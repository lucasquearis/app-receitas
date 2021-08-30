import React from 'react';
import PropTypes from 'prop-types';

export default function ListDetails({ ingredients, measures }) {
  return ingredients.map((ingredient, index) => {
    if (!measures[index]) {
      return (
        <li
          key={ `${ingredient}${Math.random() * 100}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>);
    }
    return (
      <li
        key={ `${ingredient}${Math.random() * 100}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient}
        -
        {measures[index]}
      </li>
    );
  });
}

ListDetails.defaultProps = {
  ingredient: [],
  measures: [],
};

ListDetails.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
};
