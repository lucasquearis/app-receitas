import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from './LocalStorage';

function IngredientsCheckList({ recipe, pathname, id }) {
  const containProgress = Object.keys(localStorage).includes('inProgressRecipes');
  const type = (/comidas/.test(pathname)) ? 'meals' : 'cocktails';
  const ingredientList = [];
  const measureList = [];
  const maxIngredients = 15;

  let defaultState = {
    cocktails: {
      [id]: [],
    },
    meals: {
      [id]: [],
    },
  };

  if (containProgress) {
    const local = getLocalStorage('inProgressRecipes');
    defaultState = {
      ...local,
      ...defaultState,
    };

    if (local[type] && local[type][id]) {
      defaultState[type][id] = local[type][id];
    }
  }

  const [state, setState] = useState(defaultState);

  async function onClick({ target: { name, checked } }) {
    if (checked) {
      setState({
        ...state,
        [type]: {
          [id]: [...state[type][id], name],
        },
      });
    } else {
      setState({
        ...state,
        [type]: {
          [id]: state[type][id].filter((e) => e !== name),
        },
      });
    }
  }

  useEffect(() => {
    setLocalStorage('inProgressRecipes', state);
  }, [state]);

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
            checked={ state[type][id].includes(ingredient) }
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
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsCheckList;
