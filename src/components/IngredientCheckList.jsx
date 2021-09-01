import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './IngredientCheckList.css';

const IngredientListHandle = (array) => {
  const obj = array[0].map((n) => (
    n[1] !== '' && n[1] !== null
      ? n[1]
      : null
  ));
  return obj.filter((n) => (n !== null));
};

const classHandler = (state, index) => {
  console.log(state);
  const fon = state;
  fon[index] = true;
  console.log(fon);
  return fon;
};

export default function IngredientCheckList(props) {
  const { array } = props;
  const measures = IngredientListHandle(array.measures);
  const ingredients = IngredientListHandle(array.ingredients);
  const [CBox, setclass] = useState(ingredients.map(() => false));
  const checkhandle = CBox;

  return (
    <>
      {ingredients.map((n, index) => (
        <li Key={ index }>
          <label
            htmlFor={ `${index}-key` }
            id="id"
            className={ CBox[index] ? 'checked' : 'unchecked' }
          >
            <input
              data-testid={ `${index}-ingredient-step` }
              type="checkbox"
              id={ `${index}-key` }
              onClick={ () => setclass(classHandler(checkhandle, index)) }
            />
            {`${n} ${measures[index]}`}
          </label>
        </li>
      ))}
    </>
  );
}

const { string, shape } = PropTypes;
IngredientCheckList.propTypes = {
  array: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
};
