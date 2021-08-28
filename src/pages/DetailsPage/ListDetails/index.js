import React from 'react';

export default function ListDetails({ ingredients, measures }) {
  const renderList = ingredients.map((ingredient, index) => {
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
  return renderList;
}
