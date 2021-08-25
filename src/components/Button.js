import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function Button({ name, datatestid }) {
  const { filter: { search, type }, RequestAPI } = useContext(Context);
  return (
    <button
      data-testid={ datatestid }
      onClick={ () => RequestAPI() }
      type="button"
      disabled={ search === '' || type === '' }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

export default Button;
