import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ ingredients }) {
  const onlyIngredients = Object.entries(ingredients).filter(
    (key) => key[1] !== null && key[1] !== '' && key[0].includes('strIngredient'),
  );

  const makeList = () => {
    const list = [];
    for (let index = 1; index <= onlyIngredients.length; index += 1) {
      if (ingredients[`strIngredient${index}`] !== null
        && ingredients[`strIngredient${index}`] !== '') {
        list.push(
          `${ingredients[`strIngredient${index}`]} - 
          ${ingredients[`strMeasure${index}`]}`,
        );
      }
    }
    return list;
  };

  return (
    <section className="ingredients">
      <h2>Ingredients</h2>

      <ul>
        {makeList().map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>
    </section>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.shape({ ingredient: PropTypes.string }).isRequired,
};
