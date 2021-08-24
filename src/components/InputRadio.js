import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function Input({ name, id, datatestid, value }) {
  const { setFilter, filter } = useContext(Context);
  const handleTypeChange = ({ target }) => {
    setFilter({ ...filter, type: target.value });
  };

  return (
    <label htmlFor={ id }>
      { name }
      <input
        name="type"
        type="radio"
        onChange={ (e) => handleTypeChange(e) }
        value={ value }
        data-testid={ datatestid }
        id={ id }
      />
    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
