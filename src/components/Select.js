import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const {
    label,
    name,
    onChange,
    value,
    id,
    // defaultOption,
    // defaultValue,
    options,
    testId,
  } = props;

  return (
    <label htmlFor={ name }>
      { label }
      <select
        name={ name }
        id={ id }
        required
        onChange={ onChange }
        value={ value }
        data-testid={ testId }
      >
        {/* <option value={ defaultValue }>{ defaultOption }</option> */}
        {
          options.map((option, index) => (
            <option key={ index }>{ option }</option>
          ))
        }
      </select>
    </label>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  // defaultValue: PropTypes.string.isRequired,
  // defaultOption: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

Select.defaultProps = {
  onChange: null,
  value: '',
  label: '',
  testId: '',
};

export default Select;
