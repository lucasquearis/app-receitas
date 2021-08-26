import React from 'react';
import PropTypes from 'prop-types';
import { filterIngredientsDetails } from '../../functions';

const IngredientsDetails = ({ recipe }) => {
  const ingredients = filterIngredientsDetails(recipe);
  console.log(ingredients);
  return (
    <div>
      <h1>Ingredients</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[0]} - ${ingredient[1]} `}
          </li>))}
      </ul>
    </div>
  );
};

IngredientsDetails.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default IngredientsDetails;
