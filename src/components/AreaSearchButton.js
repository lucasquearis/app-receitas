import React from 'react';
import PropTypes from 'prop-types';

export default function AreaSearchButton({ handleClick }) {
  return (
    <button
      type="button"
      data-testid="explore-by-area"
      name="area"
      value="true"
      onClick={ handleClick }
    >
      Por Local de Origem
    </button>
  );
}

AreaSearchButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
