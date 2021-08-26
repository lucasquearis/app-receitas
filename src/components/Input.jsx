import React from 'react';
import { string, func } from 'prop-types';

function Input(props) {
  const { value, id, onChange, dataTestId, text, type } = props;

  return (
    <label htmlFor={ id }>
      { text }
      <input
        type={ type }
        value={ value }
        id={ id }
        name={ id }
        onChange={ onChange }
        data-testid={ dataTestId }
      />
    </label>
  );
}

Input.propTypes = {
  value: string,
  id: string,
  onChange: func,
  dataTestId: string,
  text: string,
  type: string,
}.isRequired;

export default Input;
