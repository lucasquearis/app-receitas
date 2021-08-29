import React from 'react';
import { string, bool, func, number } from 'prop-types';

export default function Input({
  name,
  id,
  classNameInput,
  classNameLabel,
  onChange,
  type,
  step,
  value,
  checked,
  textLabel,
  placeholder,
}) {
  return (
    <label
      htmlFor={ id }
      className={ classNameLabel }
    >
      { type === 'checkbox' || type === 'radio' ? '' : textLabel }
      <input
        data-testid={ id }
        name={ name }
        id={ id }
        type={ type }
        step={ step }
        value={ value }
        onChange={ onChange }
        className={ classNameInput }
        checked={ checked }
        placeholder={ placeholder }
      />
      { type === 'checkbox' || type === 'radio' ? textLabel : '' }
    </label>
  );
}

Input.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  classNameInput: string,
  classNameLabel: string,
  onChange: func.isRequired,
  type: string,
  step: string,
  value: string || number,
  checked: bool,
  textLabel: string,
  placeholder: string,
};

Input.defaultProps = {
  classNameInput: '',
  classNameLabel: '',
  type: 'text',
  step: '',
  value: '',
  checked: false,
  textLabel: '',
  placeholder: '',
};
