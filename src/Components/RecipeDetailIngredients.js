import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeDetailIngredients({ recipe }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);

  useEffect(() => {
    const arrayOfIngredientes = (Object.entries(recipe))
      .filter((key) => key[0].includes('strIngredient'));

    setIngredientsList(arrayOfIngredientes
      .filter((ingredient) => ingredient[1] !== null
        && ingredient[1] !== '' && ingredient[1] !== ' '));

    const arrayOfMeasures = (Object.entries(recipe))
      .filter((key) => key[0].includes('strMeasure'));

    setMeasuresList(arrayOfMeasures
      .map((measure) => {
        if (measure[1] === null || measure[1] === '') {
          return ' ';
        }
        return measure[1];
      }));
  }, [recipe]);

  return (
    <div className="ingredientsContainer">
      <h3>Ingredients</h3>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ ingredient[0] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`- ${ingredient[1]} - ${measuresList[index]}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

RecipeDetailIngredients.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipeDetailIngredients;
