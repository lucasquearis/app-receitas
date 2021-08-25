import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function Button({ name, datatestid }) {
  const { filter: { search, type }, RequestAPI } = useContext(Context);
  const handleClick = async () => {
    const response = await RequestAPI();
    if (!response) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };
  return (
    <button
      data-testid={ datatestid }
      onClick={ () => handleClick() }
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
