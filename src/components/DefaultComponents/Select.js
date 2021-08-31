import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

function Select(props) {
  const {
    classNameOptions,
    classNameSelect,
    handleChange,
    label,
    name,
    options,
    testIdOptions,
    testIdSelect,
    value,
  } = props;

  return (
    <label htmlFor={ name }>
      { label }
      <select
        className={ classNameSelect }
        data-testid={ testIdSelect }
        id={ name }
        name={ name }
        onChange={ handleChange }
        value={ value }
      >
        { options.map((option) => (
          <option
            className={ classNameOptions }
            data-testid={ testIdOptions }
            key={ v4() }
            value={ option }
          >
            { option }
          </option>
        )) }
      </select>
    </label>
  );
}

const { string, func, object, arrayOf, oneOfType } = PropTypes;
Select.propTypes = {
  classNameOptions: string,
  classNameSelect: string,
  handleChange: func.isRequired,
  label: string.isRequired,
  options: oneOfType([arrayOf(string), arrayOf(object)]).isRequired,
  name: string.isRequired,
  testIdOptions: string,
  testIdSelect: string,
  value: string.isRequired,
};

Select.defaultProps = {
  classNameOptions: '',
  classNameSelect: '',
  testIdOptions: '',
  testIdSelect: '',
};

export default Select;
