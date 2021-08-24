import React from 'react';
import PropTypes from 'prop-types';

export default function InputRadio(props) {
  const { title, className, name, value, testid, id } = props;
  return (
    <label htmlFor={ id }>
      { title }
      <input
        id={ id }
        data-testid={ testid }
        name={ name }
        type="radio"
        value={ value }
        className={ className }
        selected
      />
    </label>
  );
}

InputRadio.defaultProps = {
  className: '',
  testid: '',
};

InputRadio.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testid: PropTypes.string,
  id: PropTypes.string.isRequired,
};
