import React from 'react';
import PropTypes from 'prop-types';

const IngredientListHandle = (array) => {
  const obj = array[0].map((n) => (
    n[1] !== '' && n[1] !== null
      ? n[1]
      : null
  ));
  return obj.filter((n) => (n !== null));
};

export default function IngredientList(props) {
  const { array } = props;
  const measures = IngredientListHandle(array.measures);
  const ingredients = IngredientListHandle(array.ingredients);

  return (
    <>
      {ingredients.map((n, index) => (
        <p
          Key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${n} ${measures[index]}`}
        </p>))}
    </>
  );
}

const { string, shape } = PropTypes;
IngredientList.propTypes = {
  array: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
};
