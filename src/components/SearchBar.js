import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { onClick, search } = props;
  return (
    <button type="button" onClick={ onClick }>
      <img
        src={ search }
        className="justify-content-end"
        data-testid="search-top-btn"
        alt="Icone de Perfil"
      />
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default Button;
