import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCheckList(props) {
  const { recipe } = props;
  const onClick = (e) => {
    const { target } = e;
    if (target.parentElement.style.textDecoration === 'line-through') {
      target.parentElement.style.textDecoration = 'none';
    } else {
      target.parentElement.style.textDecoration = 'line-through';
    }
  };
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
        <label
          htmlFor={ index }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            id={ index }
            type="checkbox"
            key={ index }
            onClick={ onClick }
          />
          { `${ingredient}: ${measureList[index]}` }
        </label>
      ))
    );
  };
  return (
    renderList()
  );
}

IngredientsCheckList.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

export default IngredientsCheckList;
