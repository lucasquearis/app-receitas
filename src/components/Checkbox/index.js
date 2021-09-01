import React from 'react';
import PropTypes from 'prop-types';

function CheckBox({ recipe }) {
  const mealObj = Object.entries(recipe);
  const ingredientsArray = mealObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const measureArray = mealObj.filter((meal) => {
    const measure = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && measure;
  });

  return (
    <div>
      {ingredientsArray.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label htmlFor={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ingredient }
              id={ `${index}-ingredient-step` }
            />
            {measureArray[index] ? (
              `${ingredient[1]} - ${measureArray[index][1]}`
            ) : (ingredient[1])}
          </label>
        </div>
      ))}
    </div>
  );
}

CheckBox.propTypes = {
  currentMeal: PropTypes.object,
}.isRequired;

export default CheckBox;
