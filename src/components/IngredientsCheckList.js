import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { getLocalStorage } from './LocalStorage';

const disableBTN = (ingredientList, target) => {
  const inputs = document.querySelectorAll('input:checked');
  const finishBtn = document.querySelector('.finish-recipe-button');
  if (inputs.length === ingredientList.length) {
    finishBtn.removeAttribute('disabled');
  } else {
    finishBtn.setAttribute('disabled', 'disabled');
  }
  if (target.parentElement.style.textDecoration === 'line-through') {
    target.parentElement.style.textDecoration = 'none';
  } else {
    target.parentElement.style.textDecoration = 'line-through';
  }
};

function IngredientsCheckList(props) {
  const { recipe, id, type } = props;
  const ingredientList = [];
  const measureList = [];
  const maxIngredients = 15;
  const localObj = {
    cocktails: {
      [id]: [],
    },
    meals: {},
  };
  const [state, setState] = useState(localObj);

  const onClick = (e) => {
    const { target } = e;
    const { name } = target;
    setState((prevstate) => ({
      ...prevstate, [type]: { [id]: [...prevstate, name] },
    }));
    console.log(state);
    disableBTN(ingredientList, target);
  };

  const renderList = () => {
    for (let index = 0; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index + 1}`]) {
        ingredientList.push(recipe[`strIngredient${index + 1}`]);
        measureList.push(recipe[`strMeasure${index + 1}`]);
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
            className="checkbox"
            type="checkbox"
            name={ `${ingredient}` }
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
