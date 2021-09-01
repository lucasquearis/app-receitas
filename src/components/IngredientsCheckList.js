import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from './LocalStorage';

function IngredientsCheckList({ recipe, pathname, id }) {
  const ingredientList = [];
  const measureList = [];
  const maxIngredients = 15;

  const defaultState = {
    cocktails: {
      [id]: [],
    },
    meals: {
      [id]: [],
    },
  };

  const storage = (getLocalStorage('inProgressRecipes'))
    ? defaultState
    : { ...getLocalStorage('inProgressRecipes'), ...defaultState };

  const [state, setState] = useState(storage);

  async function onClick({ target: { name, checked } }) {
    const type = (pathname === '/bebidas') ? 'cocktails' : 'meals';

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
