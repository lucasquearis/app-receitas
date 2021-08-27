import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { recipe } = props;
  const renderList = () => {
    const ingredientList = [];
    const measureList = [];
    const maxIngredients = 15;
    if (recipe) {
      for (let index = 0; index < maxIngredients; index += 1) {
        if (recipe[`strIngredient${index + 1}`]) {
          ingredientList.push(recipe[`strIngredient${index + 1}`]);
          measureList.push(recipe[`strMeasure${index + 1}`]);
        }
      }
    }
    return (
      ingredientList.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { `${ingredient}: ${measureList[index]}` }
        </li>
      ))
    );
  };
  return (
    <ul>
      { renderList() }
    </ul>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

export default IngredientsList;
